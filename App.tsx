import React from 'react';

import {SignUp, Start} from './app/screens';
import tailwind, {useDeviceContext} from 'twrnc';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './@types/navigation.type';
function App(): React.JSX.Element {
  useDeviceContext(tailwind);
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
