import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  useColorScheme,
} from 'react-native';
import {ArrowLeftIcon as ArrowLeftIconOutline} from 'react-native-heroicons/outline';
import tailwind from 'twrnc';

function BackButton(props: TouchableOpacityProps) {
  const theme = useColorScheme();
  return (
    <TouchableOpacity {...props}>
      <View style={[styles.container]}>
        <ArrowLeftIconOutline
          width={20}
          strokeWidth={3}
          color={
            theme === 'light'
              ? tailwind.color('text-purple-800')
              : tailwind.color('text-purple-300')
          }
        />
        <Text
          style={[
            styles.text,
            {
              color:
                theme === 'light'
                  ? tailwind.color('text-purple-800')
                  : tailwind.color('text-purple-300'),
            },
          ]}>
          Back
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    alignContent: 'center',
    gap: 4,
  },
  text: {
    fontSize: 19,
    fontWeight: '500',
  },
});

export default BackButton;
