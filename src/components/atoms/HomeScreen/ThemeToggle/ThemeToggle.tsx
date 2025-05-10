import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { createStyles } from '../../../../../styles/HomeStyle';
import { ThemeToggleProps } from './ThemeToggle.types';

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  toggleTheme,
  colors,
}) => {
  const styles = createStyles(colors, theme);

  return (
    <View style={styles.themeToggleContainer}>
      <TouchableOpacity 
        style={styles.themeToggleButton}
        onPress={toggleTheme}
        activeOpacity={0.8}
      >
        <Text style={styles.themeToggleSymbol}>
          {theme === 'light' ? '◑' : '◐'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};