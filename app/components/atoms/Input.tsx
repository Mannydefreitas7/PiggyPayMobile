import React, {ReactNode, useEffect, useRef} from 'react';
import {
  View,
  InputModeOptions,
  StyleSheet,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  useColorScheme,
  TextInputProps,
} from 'react-native';

import {
  IconoirProvider,
  Mail,
  Phone,
  Search,
  XmarkCircleSolid,
} from 'iconoir-react-native';

import MaskInput, {Masks} from 'react-native-mask-input';
import tailwind from 'twrnc';

interface InputProps extends TextInputProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  type: InputModeOptions | undefined;
  hintMessage?: string | ReactNode;
  hintLink?: string;
  error?: Boolean;
  label: string;
  onReset?: () => void;
}

function Input({
  type,
  label,
  error = false,
  value,
  onReset,
  onChangeText,
  hintMessage,
  leading,
  trailing,
  hintLink,
  ...props
}: InputProps) {
  const [focus, setFocus] = React.useState(Boolean);
  const animatedValue = useRef(new Animated.Value(0));
  const theme = useColorScheme();

  useEffect(() => {

   if (value && value.length > 1) {
      animatedValue.current.setValue(1);
   }

  }, [value])

  const renderIcon = () => {
    switch (type) {
      case 'email':
        return <Mail />;
      case 'tel':
        return <Phone />;
      case 'search':
        return <Search />;
      default:
        return undefined;
    }
  };

  

  const returnAnimatedTitleStyles = {
    transform: [
      {
        translateY: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -12],
          extrapolate: 'clamp',
        }),
      },
      {
        translateX: animatedValue?.current?.interpolate({
          inputRange: [0, 1],
          outputRange: [renderIcon() ? 40 : 16, renderIcon() ? 40 : 12],
          extrapolate: 'clamp',
        }),
      },
    ],
    fontSize: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 10],
    }),
    color: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: ['#000000', '#782CF3'],
    }),
    opacity: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1],
    }),
  };

  const inputStyles = {
      paddingTop: animatedValue?.current?.interpolate({
         inputRange: [0, 1],
         outputRange: [0, 14],
       }),
  }

  const viewStyles = {
    borderColor: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: ['#000000', '#782CF3'],
    }),
    borderWidth: animatedValue?.current?.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2],
    }),
  };

  const onFocus = () => {
    setFocus(true);
    Animated.timing(animatedValue?.current, {
      toValue: 1,
      duration: 200,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    if (!value) {
      setFocus(false);
      Animated.timing(animatedValue?.current, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <IconoirProvider
      iconProps={{
        color:
          theme === 'light'
            ? tailwind.color('text-black')
            : tailwind.color('text-white'),
        strokeWidth: 1,
        width: 24,
        height: 24,
      }}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.wrapper,
            viewStyles,
            tailwind.style(
              focus
                ? 'border-purple-600 dark:border-purple-400'
                : 'border-neutral-900 dark:border-neutral-100',
            ),
            tailwind.style(error && 'border-red-600 dark:border-red-400'),
          ]}>
          <Animated.Text
            style={[
              returnAnimatedTitleStyles,
              tailwind.style(
                focus
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-neutral-900 dark:text-neutral-100',
              ),
              tailwind.style(error && 'text-red-600 dark:text-red-400'),
            ]}>
            {label}
          </Animated.Text>
          {renderIcon() && <View style={styles.leading}>{renderIcon()}</View>}
          <Animated.View
            style={[
              styles.textStyle,
              styles.inputContainer,
              inputStyles,
              {paddingLeft: renderIcon() ? 40 : 12},
            ]}>
            <MaskInput
              inputMode={type}
              autoComplete="tel"
              autoCapitalize={props.autoCapitalize}
              mask={focus && type === 'tel' ? Masks.USA_PHONE : undefined}
              onChangeText={onChangeText}
              value={value}
              style={[
                tailwind.style(theme === 'light' ? 'text-black' : 'text-white'),
                {flexGrow: 1},
              ]}
              onBlur={onBlur}
              onFocus={onFocus}
            />
            <View  style={{ flexDirection: 'row', gap: 4, position: 'absolute', right: 12 }}>
            {value && value.length > 0 && (
              <TouchableOpacity
                  
                onPress={() => {
                  if (onChangeText) onChangeText('');
                  if (onReset) onReset();
                  }
                }>
                <XmarkCircleSolid opacity={0.3} />
              </TouchableOpacity>
            )}
            {trailing && <View >{trailing}</View>}
            </View>
            
          </Animated.View>
        </Animated.View>
        {typeof hintMessage === 'string' ? (
          <View style={styles.hintContainer}>
            <Text
              style={[
                styles.hintText,
                tailwind.style('text-neutral-400 dark:text-neutral-500'),
                tailwind.style(error && 'text-red-600 dark:text-red-400'),
              ]}>
              {hintMessage}
            </Text>

          </View>
        ) : <View>{hintMessage}</View>}
      </View>
    </IconoirProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
   // marginTop: 32,
  },
  leading: {
    position: 'absolute',
    left: 8,
    height: 36,
    borderRadius: 4,
    paddingVertical: 6,
    width: 32,
  },
  wrapper: {
    height: 52,
    borderWidth: 1,

    justifyContent: 'center',
    borderRadius: 6,
  },
  subContainer: {
    marginHorizontal: 24,
  },
  textStyle: {
    position: 'absolute',
    paddingHorizontal: 12,
    height: '100%',
    width: '100%',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    left: 12,
  },
  hintContainer: {
    marginTop: 6,
    gap: 4,
    marginLeft: 8,
    flexDirection: 'row',
  },
  hintLink: {
    fontSize: 14,
  },
  hintText: {
    fontSize: 14,
    color: '#565656',
  },
});

export default Input;
