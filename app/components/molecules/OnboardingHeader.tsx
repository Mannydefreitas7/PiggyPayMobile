import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  Text,
  View,
  StyleSheet,
  useColorScheme,
  ImageSourcePropType,
} from 'react-native';

import logo from './../../assets/images/logo-padding.png';
import tailwind from 'twrnc';

type IOnboardingHeaderProps = {
  showBackButton?: Boolean;
  image?: ImageSourcePropType | undefined;
  title?: string;
  description?: string;
};

function OnboardingHeader({
  image,
  description,
  showBackButton,
  title,
}: IOnboardingHeaderProps) {
  const theme = useColorScheme();

  const colors =
    theme === 'light'
      ? [
          'rgba(255, 255, 255, 1)',
          'rgba(255, 255, 255, 0.3)',
          'rgba(120, 44, 243, 0.05)',
        ]
      : ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.3)', 'rgba(154, 93, 253, 0.05)'];

  return (
    <LinearGradient style={{height: '40%'}} colors={colors}>
      <View style={style.container}>
        {image && (
          <Image resizeMode="contain" style={style.image} source={image} />
        )}
        <View style={[style.textContainer]}>
          <Text
            style={[
              style.text,
              tailwind.style('text-purple-900 dark:text-purple-100'),
            ]}>
            {title}
          </Text>
          <Text
            style={[tailwind.style('text-purple-900 dark:text-purple-100')]}>
            {description}
          </Text>
        </View>
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
    //fontFamily: 'FugazOne-Regular',
    fontSize: 36,
    fontWeight: '800',
    color: '#2A0F96',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

export default OnboardingHeader;
