import React, {useCallback, useEffect, useState} from 'react';
import {Animated, ScrollView, Text, View, useColorScheme} from 'react-native';
import tailwind from 'twrnc';
import {
  Button,
  Divider,
  Input,
  LoadingSpinner,
  OnboardingHeader,
} from '../../components';
import {ArrowRight, Check} from 'iconoir-react-native';
import userRespository from '../../repositories/user.repository';
import {SignUpProps} from '../../../@types/navigation.type';

type ISignUpUser = {
  firstName?: string;
  lastName?: string;
  username?: string;
  userId: string;
};

function SignUpScreen({route}: SignUpProps) {
  const theme = useColorScheme();
  const [scrolling, setScrolling] = useState<Boolean>(false);
  const {userId} = route.params;
  const [user, setUser] = useState<ISignUpUser>({userId});
  const [checking, setChecking] = useState<Boolean>(false);
  const [error, setError] = useState<string>();

  const checkIfAlreadyExits = useCallback(async (text: string) => {
    const alreadyExists = await userRespository.checkIfAlreadyTaken(text);
    if (alreadyExists) {
      setError('Oops! Username is already taken.');
    } else {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (user && user.username && user.username.length > 3) {
        setChecking(true);
        checkIfAlreadyExits(user.username ?? '');
      }
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [user, checkIfAlreadyExits]);

  const renderUserNameTrailing = () => {
    if (checking) {
      return <LoadingSpinner color="red" />;
    }

    if (!checking && user.username && user.username.length > 4) {
      return <Check color={'green'} strokeWidth={2} />;
    }
  };

  return (
    <View
      style={tailwind.style(theme === 'light' ? 'bg-white' : 'bg-neutral-950', {
        flex: 1,
      })}>
      <OnboardingHeader
        title="Looks like you are new."
        showBackButton
        description="We can’t find a profile registered with this account."
      />
      <Animated.View style={{opacity: scrolling ? 0.8 : 0}}>
        <Divider width={1} />
      </Animated.View>

      <ScrollView
        scrollEventThrottle={100}
        onScroll={event =>
          setScrolling(event.nativeEvent.contentOffset.y > 10)
        }>
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
          <View style={[{gap: 2}]}>
            <Input
              error={error !== undefined}
              hintMessage={error}
              label="Username"
              type="text"
              value={user?.username ?? ''}
              autoCapitalize="none"
              autoCorrect={false}
              trailing={renderUserNameTrailing()}
              onReset={() => {
                setChecking(false);
                setError(undefined);
              }}
              onChangeText={text => {
                setUser({
                  ...user,
                  username: text,
                });
              }}
            />
            <Input label="First Name" type="text" />
            <Input label="Last Name" type="text" />
          </View>
          <View style={{paddingVertical: 18}}>
            <Button appearance="Filled" label="Enter" icon={<ArrowRight />} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default SignUpScreen;
