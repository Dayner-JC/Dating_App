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
import VerifyCodeEmailLoginScreen from '../auth/verify/verify_code_email_login_screen';
import NewPasswordScreen from '../main/account/password/new_password_screen';
import EditName from '../profile/edit/edit_name';
import EditBirthday from '../profile/edit/edit_birthday';
import EditGender from '../profile/edit/edit_gender';
import EditPreferences from '../profile/edit/edit_preference';
import EditHeight from '../profile/edit/edit_height';
import EditIntentions from '../profile/edit/edit_intentions';
import EditLocation from '../profile/edit/edit_location';
import EditAbout from '../profile/edit/edit_about';
import EditInterests from '../profile/edit/edit_interests';
import EditPhotos from '../profile/edit/edit_photos';
import TwoFAEnableScreen from '../auth/2FA/2FA_enable_screen';
import TwoFASmsScreen from '../auth/2FA/2FA_sms_screen';
import TwoFAAuthenticatorScreen from '../auth/2FA/2FA_app_screen';
import VerifyCode2FaSmsScreen from '../auth/verify/verify_code_2fa_sms_screen';
import TwoFAAuthenticatorVerifyScreen from '../auth/verify/2FA_app_verify_screen';
import SettingsScreen from '../main/account/settings_screen';
import AccountScreen from '../main/account/account_screen';
import ChangePasswordScreen from '../main/account/password/change_password_screen';
import PrivacyManagementScreen from '../main/account/privacy_management_screen';
import ProfileVisibilityScreen from '../profile/profile_visibility_screen';
import BlockedUserScreen from '../main/account/users/blocked_user_screen';
import PrivacyPolicyScreen from '../main/account/privacy_policy/privacy_policy_screen';
import VerifyCodeChangeEmailScreen from '../auth/verify/verify_code_change_email_screen';
import ChangeEmailScreen from '../main/account/email/change_email_screen';
import ChangePhoneScreen from '../main/account/phone/change_phone_screen';
import VerifyCodeChangePhoneScreen from '../auth/verify/verify_code_change_phone_screen';
import ConfirmChangeEmailScreen from '../main/account/email/confirm_change_email_screen';
import ChatScreen from '../main/chat/screens/chat_screen';
import HelpCenterScreen from '../help_center/help_center_screen';
import ProfileScreen from '../main/profile_screen';
import UploadProfilePictureScreen from '../profile/profile_picture/upload_profile_picture_screen';
import DatingPreferencesScreen from '../main/account/dating_preferences/dating_preferences_screen';
import ListMatchesScreen from '../main/list_matches_screen';
import NotificationsScreen from '../notifications/NotificationsScreen';
import ReportSuccessScreen from '../main/chat/screens/report_success_screen';
import BlockSuccessScreen from '../main/chat/screens/block_success_screen';
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
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="VerifyCodeScreen" component={VerifyCodeScreen} />
        <Stack.Screen name="VerifyCodeEmailScreen" component={VerifyCodeEmailScreen} />
        <Stack.Screen name="VerifyCodeEmailLoginScreen" component={VerifyCodeEmailLoginScreen} />
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
        <Stack.Screen name="ProfileCreationSteps" component={ProfileCreationSteps} />
        <Stack.Screen name="EditName" component={EditName} />
        <Stack.Screen name="EditBirthday" component={EditBirthday} />
        <Stack.Screen name="EditGender" component={EditGender} />
        <Stack.Screen name="EditPreferences" component={EditPreferences} />
        <Stack.Screen name="EditHeight" component={EditHeight} />
        <Stack.Screen name="EditIntentions" component={EditIntentions} />
        <Stack.Screen name="EditLocation" component={EditLocation} />
        <Stack.Screen name="EditAbout" component={EditAbout} />
        <Stack.Screen name="EditInterests" component={EditInterests} />
        <Stack.Screen name="EditPhotos" component={EditPhotos} />
        <Stack.Screen name="AccountScreen" component={AccountScreen} />
        <Stack.Screen name="TwoFAEnableScreen" component={TwoFAEnableScreen} />
        <Stack.Screen name="TwoFASmsScreen" component={TwoFASmsScreen} />
        <Stack.Screen name="TwoFAAuthenticatorScreen" component={TwoFAAuthenticatorScreen} />
        <Stack.Screen name="VerifyCode2FaSmsScreen" component={VerifyCode2FaSmsScreen} />
        <Stack.Screen name="TwoFAAuthenticatorVerifyScreen" component={TwoFAAuthenticatorVerifyScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="PrivacyManagementScreen" component={PrivacyManagementScreen} />
        <Stack.Screen name="ProfileVisibilityScreen" component={ProfileVisibilityScreen} />
        <Stack.Screen name="BlockedUserScreen" component={BlockedUserScreen} />
        <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
        <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} />
        <Stack.Screen name="VerifyCodeChangeEmailScreen" component={VerifyCodeChangeEmailScreen} />
        <Stack.Screen name="ChangePhoneScreen" component={ChangePhoneScreen} />
        <Stack.Screen name="VerifyCodeChangePhoneScreen" component={VerifyCodeChangePhoneScreen} />
        <Stack.Screen name="ConfirmChangeEmailScreen" component={ConfirmChangeEmailScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="UploadProfilePictureScreen" component={UploadProfilePictureScreen} />
        <Stack.Screen name="DatingPreferencesScreen" component={DatingPreferencesScreen} />
        <Stack.Screen name="ListMatchesScreen" component={ListMatchesScreen} />
        <Stack.Screen name="ReportSuccessScreen" component={ReportSuccessScreen} />
        <Stack.Screen name="BlockSuccessScreen" component={BlockSuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
