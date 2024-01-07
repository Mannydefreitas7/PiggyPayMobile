import React, {ReactNode} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import tailwind from 'twrnc';
import googleLogoColor from './../../assets/images/google-logo-color.png';
import appleLogoWhite from './../../assets/images/apple-logo-white.png';
import appleLogoBlack from './../../assets/images/apple-logo-black.png';

type IAuthProviderButtonProps = {
  provider: 'Google' | 'Apple';
  children?: ReactNode;
};

type IAuthProviderButton = {
  label: string;
  logo: ImageSourcePropType | undefined;
};

function AuthProviderButton({provider}: IAuthProviderButtonProps) {
  const theme = useColorScheme();

  const getAuthButtonType = (): IAuthProviderButton => {
    switch (provider) {
      case 'Apple':
        return {
          label: 'Continue with Apple',
          logo: theme === 'light' ? appleLogoBlack : appleLogoWhite,
        };
      case 'Google':
        return {
          label: 'Continue with Google',
          logo: googleLogoColor,
        };

      default:
        return {
          label: 'Continue with Apple',
          logo: theme === 'light' ? appleLogoBlack : appleLogoWhite,
        };
    }
  };

  const {label, logo} = getAuthButtonType();

  return (
    <TouchableOpacity>
      <View
        style={[
          styles.container,
          tailwind.style(
            'border-2 dark:border border-black dark:border-neutral-600 text-black dark:text-neutral-600',
          ),
        ]}>
        <Image resizeMode="contain" style={styles.image} source={logo} />
        <Text
          style={[styles.text, tailwind.style('text-black dark:text-white')]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 3,
    borderRadius: 8,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  },
  image: {
    width: 18,
    height: 18,
  },
});
export default AuthProviderButton;
