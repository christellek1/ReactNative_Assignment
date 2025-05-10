// OTPScreen.styles.ts
import { StyleSheet, Dimensions, PixelRatio } from 'react-native';

// Get device dimensions
const { width } = Dimensions.get('window');
const scale = width / 375; // Base width (iPhone 6/7/8)

// Normalize size based on screen dimensions
export const normalize = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(size * scale));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: normalize(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(20),
    width: '100%',
  },
  placeholder: {
    fontSize: normalize(40),
    color: '#fff',
    letterSpacing: normalize(10),
    textAlign: 'center',
    minWidth: normalize(180),
  },
  errorText: {
    color: 'red',
    fontSize: normalize(16),
    marginBottom: normalize(20),
  },
  deleteButton: {
    position: 'absolute',
    right: normalize(40),
    padding: normalize(10),
  },
  deleteText: {
    fontSize: normalize(24),
    color: '#fff',
  },
  keypad: {
    marginBottom: normalize(20),
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: normalize(10),
  },
  key: {
    width: normalize(80),
    height: normalize(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    margin: normalize(10),
    borderRadius: normalize(40),
    borderWidth: normalize(2),
    borderColor: '#fff',
  },
  keyText: {
    fontSize: normalize(32),
    color: '#fff',
  },
  submitButton: {
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(25),
    width: '60%',
    alignItems: 'center',
  },
  activeSubmitButton: {
    backgroundColor: '#fff',
  },
  inactiveSubmitButton: {
    backgroundColor: '#888',
  },
  submitText: {
    fontSize: normalize(20),
    fontWeight: 'bold',
  },
  activeSubmitText: {
    color: '#000',
  },
  inactiveSubmitText: {
    color: '#fff',
  },
});

export default styles;
