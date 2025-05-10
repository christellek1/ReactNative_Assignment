import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from '../../../../../styles/HomeStyle';
import { HomeHeaderProps } from './HomeHeader.types';

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  colors,
  theme,
  showFavoritesOnly,
  toggleFavoritesView,
}) => {
  const styles = createStyles(colors, theme);

  return (
    <View style={styles.header}>
      <View style={styles.headerDecoration}>
        <View style={styles.headerDecorationCircle1} />
        <View style={styles.headerDecorationCircle2} />
      </View>
      <View style={styles.headerContent}>
        <View style={styles.headerTop}>
          <Text style={styles.welcomeTitle}>Discover</Text>
          <TouchableOpacity
            style={[styles.favoritesToggle, showFavoritesOnly && styles.favoritesToggleActive]}
            onPress={toggleFavoritesView}
          >
            <Text
              style={[
                styles.favoritesToggleText,
                showFavoritesOnly && styles.favoritesToggleTextActive,
              ]}
            >
              {showFavoritesOnly ? 'All Products' : 'Favorites'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeSubtitle}>
          {showFavoritesOnly ? 'Your favorite products' : 'Find your best products'}
        </Text>
      </View>
    </View>
  );
};