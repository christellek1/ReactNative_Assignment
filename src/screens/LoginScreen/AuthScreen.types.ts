// screens/AuthScreen/AuthScreen.types.ts
import { ImageSourcePropType } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

export type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Auth'
>;

export interface AuthScreenProps {
  navigation: AuthScreenNavigationProp;
  mainImage: ImageSourcePropType;
}
