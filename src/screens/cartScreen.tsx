import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useCartStore } from '../store/cartStore';
import Navbar from '../components/molecules/Navbar';
import { useTheme } from '../context/ThemeContext';

const CartScreen = ({ navigation }: { navigation: any }) => {
  const { theme, colors } = useTheme();
  const [activeTab, setActiveTab] = useState('Cart');
  const cart = useCartStore((state) => state.cart);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Your Cart</Text>
        {cart.length === 0 ? (
          <Text style={styles.empty}>Your cart is empty</Text>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
        )}
      </View>

  <Navbar
        activeTab={activeTab}
        navigation={navigation}
        colors={colors}
        theme={theme}
        setActiveTab={setActiveTab}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  empty: { fontSize: 16, marginTop: 20 },
  item: { flexDirection: 'row', marginBottom: 15 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: 'green', marginTop: 4 },
  quantity: { fontSize: 14, color: 'gray', marginTop: 2 },
});

export default CartScreen;
