import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  Text,
  View,
  StyleSheet,
  useColorScheme,
  ImageSourcePropType,
  SafeAreaView,
} from 'react-native';

import tailwind from 'twrnc';
import {BackButton} from '..';
import {useNavigation} from '@react-navigation/native';

type IOnboardingHeaderProps = {
  image?: ImageSourcePropType | undefined;
  title?: string;
  offset: number;
  description?: string;
};

function OnboardingHeader({
  image,
  description,
  offset,
  title,
}: IOnboardingHeaderProps) {
  const theme = useColorScheme();
  const colors =
    theme === 'light'
      ? [
          'rgba(255, 255, 255, 1)',
          'rgba(242, 234, 254, 0.8)',
        ]
      : ['rgba(9, 9, 9, 1)', 'rgba(27, 27, 27, 1)'];

  return (
    <LinearGradient style={{ height: 260, overflow: 'visible' }} start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.9 }}  colors={colors}>
      <View style={style.container}>
        {image && (
          <Image resizeMode="contain" style={style.image} source={image} />
        )}
        <SafeAreaView>
          <View
            style={[
              style.stack,
              {position: 'relative', justifyContent: 'flex-end'},
            ]}>

            <View style={[style.textContainer]}>
              <Text
                style={[
                  style.text,
                  tailwind.style(
                    theme === 'light' ? 'text-purple-900' : 'text-purple-300',
                  ),
                ]}>
                {title}
              </Text>
              <Text
                style={[
                  tailwind.style(
                    theme === 'light' ? 'text-purple-900' : 'text-purple-300',
                  ),
                ]}>
                {description}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
}

const style = StyleSheet.create({
  image: {
    height: 180,
  },
  text: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2A0F96',
  },
  textContainer: {
    paddingBottom: 24,
    gap: 8,
  },
  stack: {
    flex: 1,
    paddingHorizontal: 16,
    maxWidth: '70%',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

export default OnboardingHeader;
