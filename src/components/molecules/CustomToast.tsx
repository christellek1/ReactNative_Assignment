import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ToastProps {
  text1?: string;
  text2?: string;
}

const CustomToast = ({ text1, text2 }: ToastProps) => {
  return (
    <View style={styles.toastContainer}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.message}>{text2}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomToast;
