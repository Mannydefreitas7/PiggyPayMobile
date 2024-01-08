import React, { useCallback, useEffect, useState } from 'react';

import {Start, VerifyCode} from './app/screens';
import tailwind, {useDeviceContext} from 'twrnc';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './@types/navigation.type';
import supabase from './app/lib/supabase';
import Main from './app/screens/Main';
import { User } from '@supabase/supabase-js';
//KKBJWAXP78UQ1L89N1LP89XY

function App(): React.JSX.Element {
  useDeviceContext(tailwind);
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [user, setUser] = useState<User | null>();

  const fetch = useCallback(async () => {
   const user = await supabase.auth.getUser();
   console.log(user)
   setUser(user.data.user);
},[])

   useEffect(() => {

      fetch();

   })

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Main' : 'Start'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
