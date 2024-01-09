import React, {useCallback, useEffect, useState} from 'react';
import {Animated, ScrollView, Text, View, useColorScheme} from 'react-native';
import tailwind from 'twrnc';
import {
  Button,
  Divider,
  Input,
  LoadingSpinner,
  NavigationBar,
  OnboardingHeader,
} from '../../components';
import {ArrowRight, Check} from 'iconoir-react-native';
import userRespository from '../../repositories/user.repository';
import {SignUpProps} from '../../../@types/navigation.type';
import * as EmailValidator from 'email-validator';
import { generateFromEmail } from '../../utils';

type ISignUpUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  userId: string;
};

function SignUpScreen({navigation, route}: SignUpProps) {
  const theme = useColorScheme();
  const [offset, setOffset] = useState<number>(0);
  const {userId} = route.params;
  const [user, setUser] = useState<ISignUpUser>({userId});
  const [checking, setChecking] = useState<Boolean>(false);
  const [errors, setErrors] = useState<ISignUpUser>({userId: '' });

  const checkIfAlreadyExits = useCallback(async (text: string) => {
    const alreadyExists = await userRespository.checkIfAlreadyTaken(text);
    if (alreadyExists) {
      setErrors({
         ...errors,
         username: 'Oops! Username is already taken.'
      });
    } else {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
   if (user.username && user.username.length > 3) {
      setChecking(true);
      const timeOutId = setTimeout(() => {
           checkIfAlreadyExits(user.username ?? '');
       }, 500);
       return () => clearTimeout(timeOutId);
   } else {
      setChecking(false)
   }
  }, [user.username, checkIfAlreadyExits]);

  useEffect(() => {
   if (user.email && user.email.length > 3) {
      const isValid = EmailValidator.validate(user.email);
      if (!isValid) {
         setErrors({
            ...errors,
            email: "Email format is not valid."
         })
      } else {
         setErrors({
            ...errors,
            email: undefined
         })
         setUser({
            ...user,
            username: generateFromEmail(user.email, 4)
         })
      }
   } else {
      setErrors({
         ...errors,
         email: undefined
      })
   }
  }, [user.email]);

  const renderUserNameTrailing = () => {
    if (checking) {
      return <LoadingSpinner color="red" />;
    }

    if (!checking && user.username && user.username.length > 3) {
      return <Check color={'green'} strokeWidth={2} />;
    }
  };

  return (
    <View
      style={tailwind.style(theme === 'light' ? 'bg-white' : 'bg-neutral-950', {
        flex: 1,
        position: 'relative'
      })}>
         <NavigationBar offset={offset} showBackButton={true} navigate={navigation} />
         <ScrollView contentInsetAdjustmentBehavior="automatic" automaticallyAdjustKeyboardInsets={true} scrollEventThrottle={100} onScroll={event =>
          setOffset(event.nativeEvent.contentOffset.y)
        }>
         <OnboardingHeader
         offset={offset}
        title="Looks like you are new."
        description="We can’t find a profile registered with this account."
      />
      <View style={[{paddingHorizontal: 24, paddingTop: 12}]}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: 'bold',
              color:
                theme === 'light'
                  ? tailwind.color('text-black')
                  : tailwind.color('text-white'),
            }}>
            Sign up
          </Text>
          <View style={{ gap: 12, marginTop: 20 }}>
            
            <Input label="First Name" type="text" />
            <Input label="Last Name" type="text" />
            <Divider width={2} label='Account' />
            <Input 
               label="Email" 
               type="email"
               autoCapitalize="none"
               autoCorrect={false}
               error={errors.email != undefined}
               hintMessage={errors.email}
               value={user.email}
               onChangeText={text => {
                  setUser({
                     ...user,
                     email: text.replace(/\s/g, ''),
                  });
               }} />
            <Input
              error={errors.username !== undefined}
              hintMessage={errors.username}
              label="Username"
              type="text"
              value={user?.username ?? ''}
              autoCapitalize="none"
              autoCorrect={false}
              trailing={renderUserNameTrailing()}
              onReset={() => {
                setChecking(false);
                setErrors({
                  ...errors,
                  username: undefined
                });
              }}
              onChangeText={text => {
                setUser({
                  ...user,
                  username: text.replace(/\s/g, '').replace(/[^\w\s]/gi, ""),
                });
              }}
              leading={<Text>Test</Text>}
            />
          </View>
          <View style={{paddingVertical: 32}}>
            <Button appearance="Filled" label="Enter" icon={<ArrowRight />} />
          </View>
        </View>
         </ScrollView>
    </View>
  );
}

export default SignUpScreen;
