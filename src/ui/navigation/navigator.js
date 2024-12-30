import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../splash/splash_screen';
import RegisterScreen from '../auth/register_screen';
import LoginScreen from '../auth/login_screen';
import Main from '../main/main';
import VerifyCodeScreen from '../auth/verify_code_screen';
import CreateProfileScreen from '../profile/create_profile_screen';
import ProfileCreationSteps from '../profile/profile_creation_steps';

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
        <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
        <Stack.Screen name="ProfileCreationSteps" component={ProfileCreationSteps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
