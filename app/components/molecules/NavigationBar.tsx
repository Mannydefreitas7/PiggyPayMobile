import React from 'react'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { BackButton } from '..'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../@types/navigation.type'
import tailwind from 'twrnc'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurView } from "@react-native-community/blur";
type INavigationBarProps = {
   navigate: NativeStackNavigationProp<RootStackParamList>;
   showBackButton: Boolean;
   offset: number;
}

function NavigationBar({navigate, offset, showBackButton}:INavigationBarProps) {

   const safeArea = useSafeAreaInsets();

   if (offset > 5) {
      return (
         <BlurView blurType="ultraThinMaterial" style={[styles.absolute]}>
         <View style={[{paddingHorizontal: 12, paddingBottom:8, marginTop: safeArea.top, }]}>
            {showBackButton &&  <BackButton onPress={() => navigate.goBack()} />}
         </View>
      </BlurView>
      )
   }

  return (
      <View style={[styles.absolute]}>
         <View style={[{paddingHorizontal: 12, paddingBottom:8, marginTop: safeArea.top, }]}>
            {showBackButton &&  <BackButton onPress={() => navigate.goBack()} />}
         </View>
      </View>
  )
}

const styles = StyleSheet.create({
   absolute: {
      position: "absolute",
      zIndex: 50,
      top: 0,
      width: '100%',
      left: 0,
    }
})

export default NavigationBar
