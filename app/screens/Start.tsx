import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, useColorScheme} from 'react-native';
import tw from 'twrnc';
import PhoneNumber, { parsePhoneNumber } from 'libphonenumber-js';
import {
  AuthProviderButton,
  Button,
  Divider,
  Input,
  WelcomeHeader,
} from '../components';
import {ArrowRight} from 'iconoir-react-native';
import {StartProps} from '../../@types/navigation.type';
import { sendCode } from '../services/authentication.service';
import supabase from '../lib/supabase';

function Start({navigation}: StartProps) {
  const theme = useColorScheme();

  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleEnterCode = async () => {
   try {
      const { data } = await sendCode(phoneNumber);
      if (data.messageId) {
         navigation.navigate('VerifyCode', {phoneNumber});
      }
   } catch (error) {
      console.log(error)
   }
  }

  return (
    <View
      style={tw.style(theme === 'light' ? 'bg-white' : 'bg-neutral-950', {
        flex: 1,
      })}>
      <WelcomeHeader />

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
          onPress={async () => /* navigation.navigate('SignUp') */await handleEnterCode()}
          appearance="Filled"
          disabled={!PhoneNumber(phoneNumber, 'US')?.isValid()}
          label="Send Code"
          icon={<ArrowRight />}
        />
        <Divider label="Social Accounts" />
        <AuthProviderButton provider="Apple" />
        <AuthProviderButton provider="Google" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    gap: 12,
    paddingTop: 18,
  },
});

export default Start;
