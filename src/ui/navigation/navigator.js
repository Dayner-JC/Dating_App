import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../splash/splash_screen';
import RegisterPhoneScreen from '../auth/phone/register_phone_screen';
import LoginPhoneScreen from '../auth/phone/login_phone_screen';
import Main from '../main/main';
import VerifyCodeScreen from '../auth/verify/verify_code_screen';
import CreateProfileScreen from '../profile/create_profile_screen';
import ProfileCreationSteps from '../profile/profile_creation_steps';
import LoginEmailScreen from '../auth/email/login_email_screen';
import RegisterEmailScreen from '../auth/email/register_email_screen';
import PhoneAfterEmail from '../auth/phone_after_email';
import VerifyCodeEmailScreen from '../auth/verify/verify_code_email_screen';
import NewPasswordScreen from '../auth/new_password_screen';
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="RegisterPhoneScreen" component={RegisterPhoneScreen} />
        <Stack.Screen name="LoginPhoneScreen" component={LoginPhoneScreen} />
        <Stack.Screen name="LoginEmailScreen" component={LoginEmailScreen} />
        <Stack.Screen name="RegisterEmailScreen" component={RegisterEmailScreen} />
        <Stack.Screen name="PhoneAfterEmail" component={PhoneAfterEmail} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
        <Stack.Screen name="VerifyCodeEmailScreen" component={VerifyCodeEmailScreen} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
        <Stack.Screen name="ProfileCreationSteps" component={ProfileCreationSteps} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
