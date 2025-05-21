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

// Validation Schema
const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
});

type FormData = z.infer<typeof schema>;

const UploadImage = ({ navigation }: { navigation: any }) => {
  const { theme, colors } = useTheme();
  const styles = createStyles(colors, theme);
  
  const [activeTab, setActiveTab] = useState('Add'); // Set active tab to 'Add' since this is the upload screen

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price);

      // Placeholder location for now (we'll add dynamic map later)
      const defaultLocation = {
        name: 'Unknown',
        longitude: 0,
        latitude: 0,
      };

      formData.append('location', JSON.stringify(defaultLocation));

      const response = await addProduct(formData);

      Alert.alert('Success', 'Product uploaded!');
      reset();
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
                placeholderTextColor={"white"}
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
                placeholderTextColor={"white"}
                multiline
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description.message}</Text>
          )}

          <Text style={styles.label}>Price</Text>
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter price"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

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

const createStyles = (colors: any, theme: string) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 20,
    backgroundColor: colors.background,
    flexGrow: 1,
    paddingBottom: 80, // Add padding to prevent navbar overlap
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