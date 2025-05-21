import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  Platform,
} from 'react-native';
import { createStyles } from '../../styles/HomeStyle';
import { useTheme } from '../context/ThemeContext';
import { ProductCard } from '../components/atoms/HomeScreen/Card';
import { HomeHeader } from '../components/atoms/HomeScreen/Header';
import { ThemeToggle } from '../components/atoms/HomeScreen/ThemeToggle';
import images from '../assets/images';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../store/authStore';

const { home: HomeImage, plus: AddImage, user: ProfileImage } = images;

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
        <View style={[styles.arrow, sortOrder === 'desc' && styles.arrowDown]} />
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
          loading || refreshing ? (
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      <ThemeToggle theme={theme} toggleTheme={toggleTheme} colors={colors} />

      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => {
            setActiveTab('Home');
            navigation.navigate('Home');
          }}
          style={[styles.navButton, activeTab === 'Home' && styles.activeNavButton]}
        >
          <Image
            source={HomeImage}
            style={[styles.navIcon, { tintColor: activeTab === 'Home' ? '#fff' : '#333' }]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActiveTab('Add');
            navigation.navigate('UploadImage');
          }}
          style={[styles.navButton, activeTab === 'Add' && styles.activeNavButton]}
        >
          <Image
            source={AddImage}
            style={[styles.navIcon, { tintColor: activeTab === 'Add' ? '#fff' : '#333' }]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setActiveTab('ProfileScreen');
            navigation.navigate('ProfileScreen');
          }}
          style={[styles.navButton, activeTab === 'ProfileScreen' && styles.activeNavButton]}
        >
          <Image
            source={ProfileImage}
            style={[styles.navIcon, { tintColor: activeTab === 'ProfileScreen' ? '#fff' : '#333' }]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default WelcomeScreen;
