// src/styles/Details.ts
import { StyleSheet, Dimensions } from 'react-native';
import { ThemeColors } from '../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const scale = width / 375;
const normalize = (size: number) => {
  return size * scale;
};

export default (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalize(16),
    backgroundColor: colors.cardBg,
  },
  headerButton: {
    padding: normalize(8),
  },
  headerButtonText: {
    fontSize: normalize(18),
    color: colors.primary,
  },
  headerTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: colors.text.dark,
  },
  scrollContainer: {
    paddingBottom: normalize(20),
  },
  imageContainer: {
    width: width,
    height: width * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardBg,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: normalize(10),
  },
  dot: {
    height: normalize(8),
    width: normalize(8),
    borderRadius: normalize(4),
    backgroundColor: colors.text.light,
    marginHorizontal: normalize(4),
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.cardBg,
    padding: normalize(16),
    margin: normalize(16),
    borderRadius: normalize(8),
    shadowColor: colors.text.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: colors.text.dark,
    flex: 1,
    marginRight: normalize(8),
  },
  priceTag: {
    backgroundColor: colors.primary,
    borderRadius: normalize(5),
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(5),
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(10),
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    color: '#FFD700',
    fontSize: normalize(16),
    marginRight: normalize(2),
  },
  ratingText: {
    marginLeft: normalize(6),
    color: colors.text.medium,
  },
  reviewText: {
    marginLeft: normalize(10),
    color: colors.text.light,
  },
  divider: {
    height: normalize(1),
    backgroundColor: colors.border,
    marginVertical: normalize(10),
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: normalize(16),
    marginTop: normalize(10),
    marginBottom: normalize(5),
    color: colors.text.dark,
  },
  productDescription: {
    color: colors.text.medium,
    marginBottom: normalize(10),
  },
  featuresList: {
    marginTop: normalize(5),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: normalize(3),
  },
  checkmarkIcon: {
    color: colors.accent,
    marginRight: normalize(6),
  },
  featureText: {
    color: colors.text.medium,
  },
  footer: {
    flexDirection: 'row',
    padding: normalize(16),
    backgroundColor: colors.cardBg,
    borderTopWidth: normalize(1),
    borderTopColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    borderWidth: normalize(1),
    borderColor: colors.primary,
    padding: normalize(6),
    borderRadius: normalize(4),
  },
  qtyBtnText: {
    fontSize: normalize(18),
    color: colors.primary,
  },
  quantityText: {
    marginHorizontal: normalize(10),
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: colors.text.dark,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(6),
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  notFoundText: {
    fontSize: normalize(16),
    color: colors.text.medium,
  },
});