import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '../../@types/navigation.type';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(
  name: keyof RootStackParamList,
  params: any | undefined,
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
