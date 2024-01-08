import React from 'react';
import {View, useColorScheme} from 'react-native';
import {Button, Input, OnboardingHeader} from '../../components';
import tailwind from 'twrnc';
import {ArrowRight} from 'iconoir-react-native';

function SignUp() {
  const theme = useColorScheme();
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
        />
        <Button appearance="Filled" label="Enter" icon={<ArrowRight />} />
      </View>
    </View>
  );
}

export default SignUp;
