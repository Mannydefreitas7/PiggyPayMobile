import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Start: undefined;
  Main: undefined;
  VerifyCode: {phoneNumber: string};
};

export type StartProps = NativeStackScreenProps<RootStackParamList, 'Start'>;
export type VerifyCodeProps = NativeStackScreenProps<
  RootStackParamList,
  'VerifyCode'
>;
