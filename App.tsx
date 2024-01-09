import React, {useEffect, useState} from 'react';
import tailwind, {useDeviceContext} from 'twrnc';
import {NavigationContainer} from '@react-navigation/native';
import supabase from './app/lib/supabase';
import {PostgrestError} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userRespository from './app/repositories/user.repository';
import {RootStackParamList} from './@types/navigation.type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  MainScreen,
  SignInScreen,
  SignUpScreen,
  VerifyCodeScreen,
} from './app/screens';
import {navigate, navigationRef} from './app/utils/rootNavigation';
//KKBJWAXP78UQ1L89N1LP89XY

function App(): React.JSX.Element {
  useDeviceContext(tailwind);

  const [authenticated, setAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((auth, session) => {
      if (session && auth === 'SIGNED_IN') {
        userRespository.getUser(session.user.id).then(response => {
          const {user, error} = response;
          // TODO: Add another check to see if we have the User stored locally.
          if (user) {
            // User is signed in and we have retrieved the record from the db;
            setAuthenticated(true);
            AsyncStorage.setItem('user', JSON.stringify(user));
            return;
          }
          if (error) {
            // We were not able to get a user.
            // We set authenticated to false.
            setAuthenticated(false);
            // Either we have postgres error.
            if ((error as PostgrestError).message !== undefined) {
              // Display error message;
              console.log((error as PostgrestError).message);
              return;
            }

            if (error === 'Not Registered') {
              console.log('User Not registered');
              // User is signed in but we don't have his record saved in the database yet.
              // Display Sign Up view.
              navigate('SignUp', {userId: session.user.id});
            }
          }
        });
      }
    });
  });

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'SignIn'}
        screenOptions={{
          headerShown: false,
        }}>
        {authenticated ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
