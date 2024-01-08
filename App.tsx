import React from 'react';

import {Start, VerifyCode} from './app/screens';
import tailwind, {useDeviceContext} from 'twrnc';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './@types/navigation.type';
//KKBJWAXP78UQ1L89N1LP89XY

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
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
