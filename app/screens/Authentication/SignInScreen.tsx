import React, {useState} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import tw from 'twrnc';
import PhoneNumber from 'libphonenumber-js';
import {
  AuthProviderButton,
  Button,
  Divider,
  Input,
  WelcomeHeader,
} from './../../components';
import {ArrowRight} from 'iconoir-react-native';
import {SignInrops} from './../../../@types/navigation.type';
import {sendCode} from './../../services/authentication.service';

function SignInScreen({navigation}: SignInrops) {
  const theme = useColorScheme();

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [phoneLoading, setPhoneLoading] = useState<Boolean>(false);

  const handleEnterCode = async () => {
    try {
      setPhoneLoading(true)
      const {data} = await sendCode(phoneNumber);
      if (data.messageId) {
         setPhoneLoading(false)
        navigation.navigate('VerifyCode', {phoneNumber});
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={tw.style(theme === 'light' ? 'bg-white' : 'bg-neutral-950', {
        flex: 1,
      })}>
     
      

      <ScrollView
        scrollEventThrottle={8}
        
        onScroll={event => {
         setOffset(event.nativeEvent.contentOffset.y);
        }
        }>
          <WelcomeHeader offset={offset} />
        <View style={styles.container}>
          <Input
            error={false}
            returnKeyType="send"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            hintMessage="Message and data rates may apply. You will receive one verification message per login."
            type="tel"
            label={'Mobile Phone Number'}
          />
          <Button
            onPress={async () =>
              await handleEnterCode()
            }
            loading={phoneLoading}
            appearance="Filled"
            disabled={!PhoneNumber(phoneNumber, 'US')?.isValid()}
            label="Send Code"
            icon={<ArrowRight />}
          />
          <Divider label="Social Accounts" />
          <AuthProviderButton provider="Apple" />
          <AuthProviderButton provider="Google" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 12,
    paddingTop: 18,
  },
 
  hintContainer: {
   marginTop: 6,
   gap: 4,
   marginLeft: 8,
   flexDirection: 'row',
 },
  hintText: {
   fontSize: 14,
   color: '#565656',
 },
});

export default SignInScreen;
