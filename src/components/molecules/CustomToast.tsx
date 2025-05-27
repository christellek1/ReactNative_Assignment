import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ToastProps {
  text1?: string;
  text2?: string;
}

const CustomToast: React.FC<ToastProps> = ({ text1, text2 }) => {
  return (
    <View style={styles.toastContainer}>
      <View style={styles.accentLine} />
      <View style={styles.content}>
        <Text style={styles.title}>{text1}</Text>
        {text2 && <Text style={styles.message}>{text2}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: '#1e1e2f', 
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 30,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  accentLine: {
    width: 6,
    height: '100%',
    backgroundColor: '#8e44ad', 
    borderRadius: 4,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    color: '#d1cce8', 
    fontSize: 15,
  },
});

export default CustomToast;
