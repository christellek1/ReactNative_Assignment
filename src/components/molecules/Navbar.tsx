import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import images from '../../assets/images';
import { createStyles } from '../../../styles/NavbarStyle';
import { useTheme } from '../../context/ThemeContext';

const { home: HomeImage, plus: AddImage, user: ProfileImage, cart: cart } = images;

interface NavbarProps {
  activeTab: string;
  navigation: any;
  colors: any;
  theme: string;
  setActiveTab: (tab: string) => void;
}

const Navbar = ({ activeTab, navigation, colors, theme, setActiveTab }: NavbarProps) => {
  const styles = createStyles(colors, theme);

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        onPress={() => {
          setActiveTab('Home');
          navigation.navigate('Home');
        }}
        style={[styles.navButton, activeTab === 'Home' && styles.activeNavButton]}
      >
        <Image
          source={HomeImage}
          style={[styles.navIcon, { tintColor: activeTab === 'Home' ? '#fff' : '#333' }]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setActiveTab('Cart');
          navigation.navigate('Cart');
        }}
        style={[styles.navButton, activeTab === 'Cart' && styles.activeNavButton]}
      >
        <Image
          source={cart}
          style={[styles.navIcon, { tintColor: activeTab === 'Cart' ? '#fff' : '#333' }]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setActiveTab('Add');
          navigation.navigate('UploadImage');
        }}
        style={[styles.navButton, activeTab === 'Add' && styles.activeNavButton]}
      >
        <Image
          source={AddImage}
          style={[styles.navIcon, { tintColor: activeTab === 'Add' ? '#fff' : '#333' }]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setActiveTab('ProfileScreen');
          navigation.navigate('ProfileScreen');
        }}
        style={[styles.navButton, activeTab === 'ProfileScreen' && styles.activeNavButton]}
      >
        <Image
          source={ProfileImage}
          style={[styles.navIcon, { tintColor: activeTab === 'ProfileScreen' ? '#fff' : '#333' }]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
