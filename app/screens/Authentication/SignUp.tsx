import React from 'react';
import {View} from 'react-native';
import {Button, Input, OnboardingHeader} from '../../components';
import tailwind from 'twrnc';
import {ArrowRight} from 'iconoir-react-native';

function SignUp() {
  return (
    <View style={tailwind.style('bg-white dark:bg-neutral-950', {flex: 1})}>
      <OnboardingHeader
        title="Enter Code"
        description="You should have received a code by SMS."
      />
      <View style={[{paddingHorizontal: 16, gap: 12, paddingTop: 8}]}>
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
