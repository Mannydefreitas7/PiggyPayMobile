import React from 'react';
import {BottomStackParamList} from '../../@types/navigation.type';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '.';

function MainScreen() {
  const BottomTab = createBottomTabNavigator<BottomStackParamList>();

  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen name="Home" component={HomeScreen} />
    </BottomTab.Navigator>
  );
}

export default MainScreen;
