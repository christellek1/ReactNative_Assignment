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
  Image,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { launchImageLibrary, launchCamera, ImagePickerResponse, MediaType, ImageLibraryOptions, CameraOptions } from 'react-native-image-picker';
import { addProduct } from '../api/product';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/molecules/Navbar';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import {createStyles} from '../../styles/UploadImage';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required').regex(/^\d+(\.\d{1,2})?$/, 'Please enter a valid price'),
});

type FormData = z.infer<typeof schema>;

interface ImageAsset {
  uri: string;
  type: string;
  fileName: string;
}

const UploadImage = ({ navigation }: { navigation: any }) => {
  const { theme, colors } = useTheme();
  const styles = createStyles(colors, theme);
  const [activeTab, setActiveTab] = useState('Add');
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedImages, setSelectedImages] = useState<ImageAsset[]>([]);

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

  const showImagePicker = () => {
    Alert.alert(
      'Select Images',
      'Choose how you want to select images',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {
          text: 'Gallery',
          onPress: () => openGallery(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        const newImage: ImageAsset = {
          uri: asset.uri!,
          type: asset.type!,
          fileName: asset.fileName || `image_${Date.now()}.jpg`,
        };
        setSelectedImages(prev => [...prev, newImage]);
      }
    });
  };

  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 5, // Allow multiple images
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.assets) {
        const newImages: ImageAsset[] = response.assets.map(asset => ({
          uri: asset.uri!,
          type: asset.type!,
          fileName: asset.fileName || `image_${Date.now()}.jpg`,
        }));
        setSelectedImages(prev => [...prev, ...newImages]);
      }
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    if (!location) {
      Alert.alert('Location required', 'Please select a location on the map.');
      return;
    }

    if (selectedImages.length === 0) {
      Alert.alert('Images required', 'Please select at least one image.');
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

      // Append images to FormData
      selectedImages.forEach((image, index) => {
        formData.append('images', {
          uri: image.uri,
          type: image.type,
          name: image.fileName,
        } as any);
      });

      await addProduct(formData);
      Alert.alert('Success', 'Product uploaded successfully!');
      reset();
      setLocation(null);
      setSelectedImages([]);
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
                multiline
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.description && <Text style={styles.error}>{errors.description.message}</Text>}

          <Text style={styles.label}>Price ($)</Text>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

          <Text style={styles.label}>Images</Text>
          <TouchableOpacity style={styles.imagePickerButton} onPress={showImagePicker}>
            <Text style={styles.imagePickerButtonText}>
              {selectedImages.length > 0 ? `${selectedImages.length} image(s) selected` : 'Select Images'}
            </Text>
          </TouchableOpacity>

          {selectedImages.length > 0 && (
            <ScrollView horizontal style={styles.imagePreviewContainer} showsHorizontalScrollIndicator={false}>
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.imagePreview}>
                  <Image source={{ uri: image.uri }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeImageText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

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
            style={[styles.button, loading && styles.buttonDisabled]}
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



export default UploadImage;