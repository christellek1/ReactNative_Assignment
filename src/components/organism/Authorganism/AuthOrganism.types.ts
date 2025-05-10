import { ImageSourcePropType } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';

export interface AuthOrganismProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
  mainImage: ImageSourcePropType;
}
