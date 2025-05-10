// styles/SignUpScreen.styles.ts
import { StyleSheet } from 'react-native';
import { normalize } from '../src/utils/normalize'; // Adjust path as needed

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: normalize(20),
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: normalize(50),
  },
  title: {
    fontSize: normalize(28),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: normalize(14),
    textAlign: 'center',
    marginBottom: normalize(10),
    color: '#555',
  },
  inputWrapper: {
    marginBottom: normalize(15),
  },
  input: {
    height: normalize(50),
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: normalize(30),
    paddingHorizontal: normalize(18),
    fontSize: normalize(16),
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    paddingRight: normalize(70),
  },
  showHideButton: {
    position: 'absolute',
    right: normalize(15),
    padding: normalize(8),
  },
  showHideText: {
    color: '#000',
    fontWeight: '600',
    fontSize: normalize(12),
  },
  error: {
    color: 'red',
    fontSize: normalize(12),
    marginTop: normalize(5),
    paddingLeft: normalize(5),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(15),
    paddingVertical: normalize(8),
  },
  terms: {
    fontSize: normalize(12),
    color: '#666',
    marginLeft: normalize(8),
    flex: 1,
    flexWrap: 'wrap',
  },
  link: {
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: normalize(15),
    borderRadius: normalize(30),
    alignItems: 'center',
    marginTop: normalize(10),
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: normalize(18),
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: normalize(20),
    fontSize: normalize(14),
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: normalize(20),
    marginBottom: normalize(20),
  },
  icon: {
    width: normalize(30),
    height: normalize(40),
    resizeMode: 'contain',
    marginHorizontal: normalize(10),
  },
  loginLink: {
    fontSize: normalize(14),
    textAlign: 'center',
    marginTop: normalize(10),
    color: '#666',
  },
  loginBold: {
    color: '#000',
    fontWeight: '600',
  },
  underlined: {
    textDecorationLine: 'underline',
  },
});

export default styles;
