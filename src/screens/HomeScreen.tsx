import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, View, Text } from 'react-native';
import productsData from '../Products.json';
import { createStyles } from '../../styles/HomeStyle';
import { useTheme, ThemeColors, Theme } from '../context/ThemeContext';
import { ProductCard } from '../components/atoms/HomeScreen/Card';
import { HomeHeader } from '../components/atoms/HomeScreen/Header';
import { ThemeToggle } from '../components/atoms/HomeScreen/ThemeToggle';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const { theme, colors, toggleTheme } = useTheme();
  const styles = createStyles(colors, theme);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(productsData.data);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    if (showFavoritesOnly) {
      setFilteredProducts(productsData.data.filter(item => favorites.includes(item._id)));
    } else {
      setFilteredProducts(productsData.data);
    }
  }, [showFavoritesOnly, favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const toggleFavoritesView = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      
      <HomeHeader 
        colors={colors}
        theme={theme}
        showFavoritesOnly={showFavoritesOnly}
        toggleFavoritesView={toggleFavoritesView}
      />

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            navigation={navigation}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(item._id)}
            colors={colors}
            theme={theme}
          />
        )}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              {showFavoritesOnly
                ? 'No favorites yet. Add some products to your favorites!'
                : 'No products available.'}
            </Text>
          </View>
        }
      />

      <ThemeToggle 
        theme={theme}
        toggleTheme={toggleTheme}
        colors={colors}
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;