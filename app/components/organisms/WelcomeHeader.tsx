import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image, Text, View, StyleSheet, useColorScheme} from 'react-native';

import logo from './../../assets/images/logo-padding.png';
import tailwind from 'twrnc';

function WelcomeHeader() {
  const theme = useColorScheme();

  const colors =
    theme === 'light'
      ? [
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 0.3)',
          'rgba(120, 44, 243, 0.05)',
        ]
      : ['rgba(9, 9, 9, 1)', 'rgba(27, 27, 27, 1)'];

  return (
    <LinearGradient style={{height: '40%'}} colors={colors}>
      <View style={style.container}>
        <Image resizeMode="contain" style={style.image} source={logo} />
        <Text
          style={[
            style.text,
            tailwind.style('text-purple-900 dark:text-purple-100'),
          ]}>
          Buddle
        </Text>
      </View>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  image: {
    height: 180,
    shadowColor: '#782CF3',
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10.0,
  },
  text: {
    fontFamily: 'FugazOne-Regular',
    fontSize: 40,
    color: '#2A0F96',
  },
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeHeader;
