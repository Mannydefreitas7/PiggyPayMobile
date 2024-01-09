import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, Text, View, useColorScheme, StyleSheet} from 'react-native';
import {Button, Input, NavigationBar, OnboardingHeader} from '../../components';
import tailwind, { style } from 'twrnc';
import {ArrowRight} from 'iconoir-react-native';
import {verifyOTP} from '../../services/authentication.service';
import {VerifyCodeProps} from '../../../@types/navigation.type';
import { isNumericInputValid } from '../../utils';

function VerifyCode({navigation, route}: VerifyCodeProps) {
  const theme = useColorScheme();
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [resendLoading, setResendLoading] = useState<Boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<string>();
  const verify = async () => {
   setLoading(true);
    try {
      const res = await verifyOTP(code, route.params.phoneNumber);

      if (res.error) {
         setError(res.error.message);
         setLoading(false);
         return;
      }

    } catch (error) {
      console.log(error);
    }
  };

  const renderHintMessage = () => (
       <View style={[ styles.hintContainer, { flexDirection: 'row' }]}>
                  <Text style={styles.hintText}>
                     {error ? error : 'Didn’t receive any code yet?'}
                  </Text>
               <TouchableOpacity>
                     <Text style={{ color: 'blue' }}>
                        Resend
                     </Text>
               </TouchableOpacity>
            </View>
  )
  return (
    <View
      style={tailwind.style(theme === 'light' ? 'bg-white' : 'bg-neutral-950', {
        flex: 1,
      })}>
          <NavigationBar offset={offset} showBackButton={true} navigate={navigation} />
         <ScrollView
        scrollEventThrottle={8}
        
        onScroll={event => {
         setOffset(event.nativeEvent.contentOffset.y);
        }
        }>
      <OnboardingHeader
        title="Enter Code"
        offset={0}
        description="You should have received a code by SMS."
      />
      <View style={[{paddingHorizontal: 24, gap: 12, paddingTop: 24}]}>
        <Input
          label="Code"
          type="numeric"
          hintMessage={renderHintMessage()}
          value={code}
          error={error != undefined}
          onReset={() => setError(undefined)}
          onChangeText={setCode}
          
        />
        <Button
         loading={loading}
          disabled={isNumericInputValid(code)}
          appearance="Filled"
          label="Enter"
          icon={<ArrowRight />}
          onPress={async () => await verify()}
        />
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
     paddingHorizontal: 24,
     gap: 12,
     paddingTop: 18,
   },
  
   hintContainer: {
    marginTop: 6,
    gap: 4,
    marginLeft: 8,
    flexDirection: 'row',
  },
   hintText: {
    fontSize: 14,
    color: '#565656',
  },
 });

export default VerifyCode;
