import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Start: undefined;
  SignUp: undefined;
};

export type StartProps = NativeStackScreenProps<RootStackParamList, 'Start'>;
