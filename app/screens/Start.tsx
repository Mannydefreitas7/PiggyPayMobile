import React from 'react';
import {StyleSheet, View} from 'react-native';
import tw from 'twrnc';

import {Button, Input, WelcomeHeader} from '../components';
import {ArrowRight} from 'iconoir-react-native';

function Start() {
  return (
    <View style={tw.style('bg-white dark:bg-neutral-950', {flex: 1})}>
      <WelcomeHeader />
      <View style={styles.container}>
        <Input
          error={false}
          hintMessage="Message and data rates may apply. You will receive one verification message per login."
          type="tel"
          label={'Mobile Phone Number'}
        />
        <Button appearance="Filled" label="Send Code" icon={<ArrowRight />} />
        <Button appearance="Outline" label="Send Code" icon={<ArrowRight />} />
        <Button appearance="Link" label="Send Code" icon={<ArrowRight />} />
        <Button appearance="Subtle" label="Send Code" icon={<ArrowRight />} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});

export default Start;
