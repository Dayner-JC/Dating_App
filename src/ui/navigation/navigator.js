import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../splash/splash_screen';
import RegisterScreen from '../auth/register_screen';
import LoginScreen from '../auth/login_screen';
import Main from '../main/main';
import CreateAccountForm from '../../test';
import VerifyCodeScreen from '../auth/verify_code_screen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
        <Stack.Screen name="CompleteProfile" component={CreateAccountForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
