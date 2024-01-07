import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {Start} from './app/screens';
import tailwind, {useDeviceContext} from 'twrnc';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  useDeviceContext(tailwind);

  return <Start />;
}

export default App;
