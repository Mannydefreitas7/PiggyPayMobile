import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import tailwind from 'twrnc';

type IDividerProps = {
  label?: string;
  width?: 1.5 | number;
};

function Divider({label, width = 1.5}: IDividerProps) {
  const renderLine = () => (
    <View
      style={[
        styles.divider,
        tailwind.style('bg-neutral-300 dark:bg-neutral-700'),
        {height: width},
      ]}
    />
  );
  return (
    <View style={[styles.container, {height: label ? 24 : 0}]}>
      {renderLine()}
      {label && (
        <Text
          style={[
            styles.text,
            tailwind.style('text-neutral-300 dark:text-neutral-700'),
          ]}>
          {label}
        </Text>
      )}
      {label && renderLine()}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 8,
  },
});

export default Divider;
