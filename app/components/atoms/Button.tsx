import {IconoirProvider} from 'iconoir-react-native';
import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import tailwind from 'twrnc';

type IButtonProps = {
  label?: string;
  icon?: ReactNode;
  appearance: 'Filled' | 'Outline' | 'Subtle' | 'Link';
  children?: ReactNode;
};

function Button({label, icon, appearance = 'Filled', children}: IButtonProps) {
  const theme = useColorScheme();
  const getAppearance = (): {
    container: string;
    text: string;
    iconLight: string;
    iconDark: string;
  } => {
    switch (appearance) {
      case 'Filled':
        return {
          container: 'bg-indigo-600',
          text: 'text-white',
          iconLight: 'text-white',
          iconDark: 'text-white',
        };
      case 'Subtle':
        return {
          container: 'bg-neutral-500 bg-opacity-10',
          text: 'text-neutral-700 dark:text-neutral-200',
          iconLight: 'text-neutral-700',
          iconDark: 'text-neutral-200',
        };
      case 'Link':
        return {
          container: 'bg-neutral-500 bg-opacity-10',
          text: 'text-indigo-700 dark:text-indigo-300',
          iconLight: 'text-indigo-700',
          iconDark: 'text-indigo-300',
        };
      case 'Outline':
        return {
          container: 'border-2 border-indigo-600 dark:border-indigo-300',
          text: 'text-indigo-600 dark:text-indigo-300',
          iconLight: 'text-indigo-600',
          iconDark: 'text-indigo-300',
        };
      default:
        return {
          container: 'bg-indigo-600',
          text: 'text-white',
          iconLight: 'text-white',
          iconDark: 'text-white',
        };
    }
  };

  const renderChildren = () => {
    if (children) {
      return <View>{children}</View>;
    }
    return (
      <Text
        style={[
          tailwind.style(getAppearance().text),
          {flexGrow: 1, fontSize: 16, fontWeight: 'bold', textAlign: 'center'},
        ]}>
        {label}
      </Text>
    );
  };

  return (
    <TouchableOpacity>
      <View
        style={[
          styles.container,
          {paddingLeft: icon ? 18 : 12},
          tailwind.style(getAppearance().container),
        ]}>
        {renderChildren()}
        <IconoirProvider
          iconProps={{
            height: 16,
            width: 16,
            strokeWidth: 3,
            color:
              theme === 'light'
                ? tailwind.color(getAppearance().iconLight)
                : tailwind.color(getAppearance().iconDark),
          }}>
          {icon && <View>{icon}</View>}
        </IconoirProvider>
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
    borderRadius: 8,
  },
});

export default Button;
