import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Animated,
} from 'react-native';
import { createStyles } from '../../styles/HomeStyle';
import { useTheme } from '../context/ThemeContext';
import { ProductCard } from '../components/atoms/HomeScreen/Card';
import { HomeHeader } from '../components/atoms/HomeScreen/Header';
import { ThemeToggle } from '../components/atoms/HomeScreen/ThemeToggle';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/molecules/Navbar';

// Skeleton Card Component
const SkeletonCard = ({ colors, theme }: { colors: any; theme: string }) => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => startAnimation());
    };
    startAnimation();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const skeletonStyles = {
    container: {
      backgroundColor: colors.cardBackground || (theme === 'dark' ? '#2A2A2A' : '#FFFFFF'),
      borderRadius: 12,
      padding: 12,
      margin: 8,
      flex: 1,
      maxWidth: '46%',
      shadowColor: theme === 'dark' ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    imageContainer: {
      height: 150,
      backgroundColor: colors.skeletonBase || (theme === 'dark' ? '#333' : '#E5E5E5'),
      borderRadius: 8,
      marginBottom: 8,
    },
    textLine: {
      height: 16,
      backgroundColor: colors.skeletonBase || (theme === 'dark' ? '#333' : '#E5E5E5'),
      borderRadius: 4,
      marginBottom: 8,
    },
    shortTextLine: {
      height: 14,
      backgroundColor: colors.skeletonBase || (theme === 'dark' ? '#333' : '#E5E5E5'),
      borderRadius: 4,
      width: '70%',
      marginBottom: 8,
    },
    priceContainer: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      marginTop: 4,
    },
    priceLine: {
      height: 18,
      backgroundColor: colors.skeletonBase || (theme === 'dark' ? '#333' : '#E5E5E5'),
      borderRadius: 4,
      width: '40%',
    },
    favoriteButton: {
      width: 24,
      height: 24,
      backgroundColor: colors.skeletonBase || (theme === 'dark' ? '#333' : '#E5E5E5'),
      borderRadius: 12,
    },
  };

  return (
    <Animated.View style={[skeletonStyles.container , { opacity }]}>
      <Animated.View style={skeletonStyles.imageContainer} />
      <Animated.View style={skeletonStyles.textLine} />
      <View style={skeletonStyles.priceContainer}>
        <Animated.View style={skeletonStyles.favoriteButton} />
      </View>
    </Animated.View>
  );
};

// Skeleton List Component
const SkeletonList = ({ colors, theme }: { colors: any; theme: string }) => {
  const skeletonData = Array.from({ length: 6 }, (_, index) => ({ id: index.toString() }));

  return (
    <FlatList
      data={skeletonData}
      renderItem={() => <SkeletonCard colors={colors} theme={theme} />}
      keyExtractor={(item) => `skeleton-${item.id}`}
      numColumns={2}
      contentContainerStyle={{ padding: 8 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  );
};

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const { theme, colors, toggleTheme } = useTheme();
  const styles = createStyles(colors, theme);

  const accessToken = useAuthStore((state) => state.accessToken);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('');

  const BASE_URL = axiosInstance.defaults.baseURL || '';

  const fetchProducts = useCallback(
    async (isRefresh = false) => {
      if (!accessToken) return;

      if (isRefresh) {
        setRefreshing(true);
        setPage(1);
      } else {
        setLoading(true);
      }

      try {
        const params: any = {
          page: isRefresh ? 1 : page,
          limit,
        };
        if (searchTerm.trim().length > 0) {
          params.name = searchTerm.trim();
        }
        if (sortOrder) {
          params.sortBy = 'price';
          params.order = sortOrder;
        }

        const response = await axiosInstance.get('/api/products', {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          const newProducts = response.data.data || [];
          if (isRefresh) {
            setProducts(newProducts);
          } else {
            setProducts((prev) => (page === 1 ? newProducts : [...prev, ...newProducts]));
          }
          setHasNextPage(response.data.pagination.hasNextPage);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        if (isRefresh) setRefreshing(false);
        else setLoading(false);
        setInitialLoading(false);
      }
    },
    [accessToken, page, limit, searchTerm, sortOrder]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLoadMore = () => {
    if (hasNextPage && !loading && !refreshing) {
      setPage((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    fetchProducts(true);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const toggleFavoritesView = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const cycleSortOrder = () => {
    if (sortOrder === '') setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder('');
    setPage(1);
  };

  const onChangeSearch = (text: string) => {
    setSearchTerm(text);
    setPage(1);
  };

  const displayedProducts = showFavoritesOnly
    ? products.filter((item) => favorites.includes(item._id))
    : products;

  // Show skeleton loading during initial load
  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />

        <HomeHeader
          colors={colors}
          theme={theme}
          showFavoritesOnly={showFavoritesOnly}
          toggleFavoritesView={toggleFavoritesView}
        />

        <View style={styles.headerContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Search products..."
              placeholderTextColor="grey"
              value={searchTerm}
              onChangeText={onChangeSearch}
              style={styles.searchInput}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.sortButton, sortOrder !== '' && styles.sortButtonActive]}
            onPress={cycleSortOrder}
          >
            <Text style={[styles.sortButtonText, sortOrder !== '' && styles.sortButtonTextActive]}>
              Price: {sortOrder === '' ? 'None' : sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
            </Text>
          </TouchableOpacity>
        </View>

        <SkeletonList colors={colors} theme={theme} />

        <ThemeToggle theme={theme} toggleTheme={toggleTheme} colors={colors} />

        <Navbar
          activeTab={activeTab}
          navigation={navigation}
          colors={colors}
          theme={theme}
          setActiveTab={setActiveTab}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />

      <HomeHeader
        colors={colors}
        theme={theme}
        showFavoritesOnly={showFavoritesOnly}
        toggleFavoritesView={toggleFavoritesView}
      />

      <View style={styles.headerContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="grey"
            value={searchTerm}
            onChangeText={onChangeSearch}
            style={styles.searchInput}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.sortButton, sortOrder !== '' && styles.sortButtonActive]}
          onPress={cycleSortOrder}
        >
          <Text style={[styles.sortButtonText, sortOrder !== '' && styles.sortButtonTextActive]}>
            Price: {sortOrder === '' ? 'None' : sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedProducts}
        renderItem={({ item }) => {
          const itemWithFullImages = {
            ...item,
            images:
              item.images?.map((img: any) => ({
                ...img,
                url: img.url.startsWith('http') ? img.url : `${BASE_URL}${img.url}`,
              })) || [],
          };

          return (
            <ProductCard
              item={itemWithFullImages}
              navigation={navigation}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(item._id)}
              colors={colors}
              theme={theme}
            />
          );
        }}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          refreshing ? (
            <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>
                {showFavoritesOnly
                  ? 'No favorites yet. Add some products to your favorites!'
                  : 'No products available.'}
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          loading && products.length > 0 && !initialLoading ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ margin: 20 }} />
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} colors={colors} />

      <Navbar
        activeTab={activeTab}
        navigation={navigation}
        colors={colors}
        theme={theme}
        setActiveTab={setActiveTab}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;