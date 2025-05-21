// src/styles/NavbarStyle.ts
import { StyleSheet } from 'react-native';

export const createStyles = (colors: any, theme: string) => StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    borderTopWidth: 1,
    borderTopColor: theme === 'light' ? '#ddd' : '#444',
  },
  navButton: {
    padding: 10,
    borderRadius: 20,
  },
  activeNavButton: {
    backgroundColor: colors.primary,
  },
  navIcon: {
    width: 24,
    height: 24,
  resizeMode: 'contain',
  tintColor: theme === 'light' ? '#333' : '#fff',
  },
});