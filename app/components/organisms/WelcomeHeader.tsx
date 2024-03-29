import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image, Text, View, StyleSheet, useColorScheme, Animated} from 'react-native';
import logo from './../../assets/images/logo-padding.png';
import tailwind from 'twrnc';

function WelcomeHeader({offset}: {offset: number}) {
  const theme = useColorScheme();

  const colors =
    theme === 'light'
      ? [
          'rgba(255, 255, 255, 1)',
          'rgba(242, 234, 254, 0.8)',
        ]
      : ['rgba(9, 9, 9, 1)', 'rgba(27, 27, 27, 1)'];

   const offsetScale = 1 - (offset / 300);
   const scale = offsetScale < 0.7 ? 0.7 : offsetScale > 1.2 ? 1.2 : offsetScale;


  return (
   <Animated.View >
      <LinearGradient style={{ height: 320, overflow: 'visible' }} start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.9 }} colors={colors}>
      <View style={[style.container, {transform: [{scale}], transformOrigin: 'bottom'}]} >
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
      </Animated.View>
  );
}

const style = StyleSheet.create({
  image: {
    height: 180,
    // shadowColor: '#782CF3',
    // shadowOffset: {
    //   width: 5,
    //   height: 3,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 10.0,
  },
  text: {
    fontFamily: 'FugazOne-Regular',
    fontSize: 40,
    color: '#2A0F96',
  },
  container: {
    //height: '100%',
    flex: 1,
    paddingVertical: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default WelcomeHeader;
