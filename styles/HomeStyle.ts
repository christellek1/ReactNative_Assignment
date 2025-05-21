// WelcomeScreen.styles.ts
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { ThemeColors, Theme } from '../src/context/ThemeContext';

const { width, height } = Dimensions.get('window');
const scale = width / 375;

export const normalizeFontSize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const createStyles = (colors: ThemeColors, theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'relative',
    backgroundColor: colors.cardBg,
    borderBottomLeftRadius: width * 0.08,
    borderBottomRightRadius: width * 0.08,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 8,
    marginBottom: 3,
    overflow: 'hidden',
  },
  headerDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerDecorationCircle1: {
    position: 'absolute',
    width: width * 0.48,
    height: width * 0.48,
    borderRadius: width * 0.24,
    backgroundColor: colors.secondary,
    opacity: 0.1,
    top: -width * 0.27,
    right: -width * 0.13,
  },
  headerDecorationCircle2: {
    position: 'absolute',
    width: width * 0.37,
    height: width * 0.37,
    borderRadius: width * 0.185,
    backgroundColor: colors.primary,
    opacity: 0.08,
    top: width * 0.1,
    left: -width * 0.19,
  },
  headerContent: {
    padding: width * 0.053,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.03,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  welcomeTitle: {
    fontSize: normalizeFontSize(32),
    fontWeight: 'bold',
    color: colors.text.dark,
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    fontSize: normalizeFontSize(16),
    color: colors.text.medium,
    marginTop: 1,
    paddingRight: width * 0.11,
    letterSpacing: 0.2,
  },
  favoritesToggle: {
    padding: 2.5,
    paddingHorizontal: 3.5,
    borderRadius: 5,
    backgroundColor: colors.background,
    borderWidth: 0.3,
    borderColor: colors.border,
  
  },
  favoritesToggleActive: {
    backgroundColor: theme === 'light' ? 'rgba(91, 33, 182, 0.1)' : 'rgba(139, 92, 246, 0.2)',
    borderColor: theme === 'light' ? 'rgba(91, 33, 182, 0.2)' : 'rgba(139, 92, 246, 0.3)',
  },
  favoritesToggleText: {
    fontSize: normalizeFontSize(14),
    fontWeight: '600',
    color: colors.text.medium,
  },
  favoritesToggleTextActive: {
    color: colors.primary,
  },
  productGrid: {
    paddingHorizontal: width * 0.042,
    paddingBottom: height * 0.025,
  },
  productCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    margin: width * 0.021,
    borderRadius: 3,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 2.5,
    right: 2.5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 5,
    padding: 4,
  },
  favoriteIcon: {
    fontSize: normalizeFontSize(18),
    color: '#fff',
  },
  favoriteIconActive: {
    color: colors.favorite,
  },
  productInfo: {
    padding: 8,
  },
  productTitle: {
    fontSize: normalizeFontSize(14),
    fontWeight: 'bold',
    color: colors.text.dark,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingStars: {
    fontSize: normalizeFontSize(12),
    color: '#FFD700',
    marginRight: 4,
  },
  ratingCount: {
    fontSize: normalizeFontSize(12),
    color: colors.text.light,
  },
  productPrice: {
    fontSize: normalizeFontSize(14),
    fontWeight: '600',
    color: colors.primary,
    marginTop: 4,
  },
  emptyStateContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: normalizeFontSize(14),
    color: colors.text.light,
    textAlign: 'center',
  },
  themeToggleContainer: {
  position: 'absolute',
  bottom: 70,
  right: 20,
  backgroundColor: colors.cardBg,
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
themeToggleButton: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: colors.border,
  
},
themeToggleSymbol: {
  fontSize: normalizeFontSize(28),
  color: colors.primary,
  fontWeight: 'bold',
},
bottomNav: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 40,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderTopColor: '#e0e0e0',
},

navButton: {
  padding: 8,
  borderRadius: 24, // makes circle background possible
},

activeNavButton: {
  backgroundColor: '#000', // black background when active
},

navIcon: {
  width: 26,
  height: 26,
},
headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  searchInput: {
    fontSize: 16,
    color: 'black',
  },
  sortButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  sortButtonActive: {
    backgroundColor: '#9c80d8', // lighter purple
  },
  sortButtonText: {
    fontSize: 14,
    color: 'black',
    marginRight: 8,
  },
  sortButtonTextActive: {
    color: 'white',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '0deg' }],
  },
  arrowDown: {
    transform: [{ rotate: '180deg' }],
  },
});

