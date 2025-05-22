import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProduct } from '../api/product';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/molecules/Navbar';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
});

type FormData = z.infer<typeof schema>;

const UploadImage = ({ navigation }: { navigation: any }) => {
  const { theme, colors } = useTheme();
  const styles = createStyles(colors, theme);
  const [activeTab, setActiveTab] = useState('Add');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleMapPress = (e: MapPressEvent) => {
    const { coordinate } = e.nativeEvent;
    setLocation(coordinate);
  };

  const onSubmit = async (data: FormData) => {
    if (!location) {
      Alert.alert('Location required', 'Please select a location on the map.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append(
        'location',
        JSON.stringify({ latitude: location.latitude, longitude: location.longitude })
      );

      await addProduct(formData);
      Alert.alert('Success', 'Product uploaded!');
      reset();
      setLocation(null);
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create New Product</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Title</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter product title"
                placeholderTextColor="white"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter description"
                placeholderTextColor="white"
                multiline
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

          <Text style={styles.label}>Price</Text>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter price"
                placeholderTextColor="white"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

          <Text style={styles.label}>Select Location</Text>
          <MapView
            style={styles.map}
            onPress={handleMapPress}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {location && (
              <Marker coordinate={location} />
            )}
          </MapView>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Submit Product</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

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

const createStyles = (colors: any, theme: string) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      padding: 20,
      backgroundColor: colors.background,
      flexGrow: 1,
      paddingBottom: 80,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
      marginVertical: 20,
      color: colors.text,
    },
    card: {
      backgroundColor: colors.card,
      padding: 20,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: theme === 'light' ? 0.1 : 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    label: {
      fontSize: 16,
      marginBottom: 6,
      color: colors.text,
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      marginBottom: 12,
      color: colors.text,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    error: {
      color: colors.error,
      fontSize: 14,
      marginBottom: 12,
    },
    map: {
      height: 200,
      borderRadius: 10,
      marginBottom: 16,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default UploadImage;
