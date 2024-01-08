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
  const navigate = useNavigation();
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
        {image && (
          <Image resizeMode="contain" style={style.image} source={image} />
        )}
        <SafeAreaView>
          <View
            style={[
              style.stack,
              {justifyContent: showBackButton ? 'space-between' : 'flex-end'},
            ]}>
            {showBackButton && <BackButton onPress={() => navigate.goBack()} />}

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
    shadowColor: '#782CF3',
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10.0,
  },
  text: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2A0F96',
  },
  textContainer: {
    paddingBottom: 24,
  },
  stack: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});

export default OnboardingHeader;
