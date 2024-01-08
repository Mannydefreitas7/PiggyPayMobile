import React, { useState } from 'react';
import {Text, View, useColorScheme} from 'react-native';
import {Button, Input, OnboardingHeader} from '../../components';
import tailwind from 'twrnc';
import {ArrowRight} from 'iconoir-react-native';
import { verifyOTP } from '../../services/authentication.service';
import { VerifyCodeProps } from '../../../@types/navigation.type';
import supabase from '../../lib/supabase';

function VerifyCode({ navigation, route }: VerifyCodeProps) {
  const theme = useColorScheme();
  const [code, setCode] = useState<string>('');

  const verify = async () => {
      try {
         const res = await verifyOTP(code, route.params.phoneNumber);
         console.log(res.data.user?.id)
      } catch (error) {
         console.log(error)
      }
  }
  return (
    <View
      style={tailwind.style(theme === 'light' ? 'bg-white' : 'bg-neutral-950', {
        flex: 1,
      })}>
      <OnboardingHeader
        title="Enter Code"
        showBackButton
        description="You should have received a code by SMS."
      />
      <View style={[{paddingHorizontal: 24, gap: 12, paddingTop: 8}]}>
        <Input
          label="Code"
          type="numeric"
          hintMessage={'Didn’t receive any code yet?'}
          hintLink="Resend"
          value={code}
          onChangeText={setCode}
        />
        <Button appearance="Filled" label="Enter" icon={<ArrowRight />} onPress={async () =>await verify()}/>
        
      </View>
    </View>
  );
}

export default VerifyCode;
