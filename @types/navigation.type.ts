import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: {userId: string};
  Main: undefined;
  VerifyCode: {phoneNumber: string};
};

export type BottomStackParamList = {
  Home: undefined;
};

export type SignInrops = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
export type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;
export type VerifyCodeProps = NativeStackScreenProps<
  RootStackParamList,
  'VerifyCode'
>;

export type HomeProps = NativeStackScreenProps<BottomStackParamList, 'Home'>;
