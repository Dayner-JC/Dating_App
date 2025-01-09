/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChevronDownIcon from '../../../assets/icons/chevron-down.svg';
import CountryPicker from 'react-native-country-picker-modal';
import Button from '../../components/button';
import GoogleIcon from '../../../assets/icons/google.svg';
import FacebookIcon from '../../../assets/icons/facebook.svg';
import AppleIcon from '../../../assets/icons/apple.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_9.svg';
import Petal4 from '../../../assets/splash_screen_flower/petals/petal_10.svg';
import EmailIcon from '../../../assets/icons/email.svg';
import { handlePhoneRegister } from '../../../infrastructure/auth/register/register_phone';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  validateFacebookLogin,
  validateAppleLogin,
} from '../../../infrastructure/auth/validation/login_validation';

const LoginPhoneScreen = () => {
  const navigation = useNavigation();

  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(`+${country.callingCode}`);
  };

  const handlePhoneNumberChange = (text) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(filteredText);
  };

  const handlePhoneLogin = async () => {
    try {
      const verificationId = await handlePhoneRegister(callingCode, phoneNumber);
      navigation.navigate('VerifyCodeScreen', {
        phoneNumber,
        callingCode,
        verificationId,
        login: true,
      });
    } catch (error) {
      console.error('Phone Login Error:', error);
      Alert.alert('Error', 'Failed to send verification code.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const signInResult = await GoogleSignin.signIn();

      let idToken = signInResult.data?.idToken;

      if (!idToken) {
        idToken = signInResult.idToken;
      }

      if (!idToken) {
        throw new Error('Failed to obtain token ID');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const userCredential = await auth().signInWithCredential(googleCredential);

      const firebaseIdToken = await userCredential.user.getIdToken();

      const { uid } = userCredential.user;

      const requestBody = {
        firebaseIdToken,
        uid,
      };

      const response = await fetch('http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/login/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('Login successful: ', data);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await validateFacebookLogin();
      if (result?.success) {
        navigation.navigate('Main');
      } else {
        Alert.alert('Login Failed', 'Facebook login failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during Facebook login.');
    }
  };

  const handleAppleLogin = async () => {
    try {
      const result = await validateAppleLogin();
      if (result?.success) {
        navigation.navigate('Main');
      } else {
        Alert.alert('Login Failed', 'Apple login failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during Apple login.');
    }
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
      <View style={styles.container}>
      <View style={styles.top_petals}>
        <Petal1 style={styles.petal1}/>
      </View>
        <View style={styles.content}>
          <Text style={styles.title_text}>Sign in</Text>
          <Text style={styles.subtitle_text}>Welcome back!</Text>

          <View style={styles.input_container}>
            <Text style={styles.phone_number_text}>Phone Number</Text>
            <View
              style={[
                styles.phone_input_container,
                isFocused ? styles.focused_border : styles.default_border,
              ]}
            >
              <View
                style={[styles.country_picker, { borderEndColor: isFocused ? '#D97904' : '#D9D2B0' }]}
              >
                <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withCallingCode
                  withFilter
                  withCallingCodeButton
                  onSelect={onSelect}
                  theme={{
                      backgroundColor: '#17261F',
                      onBackgroundTextColor: '#FFFFFF',
                  }}
              />
              <ChevronDownIcon width={15} height={15} fill="#FFFFFF" style={styles.icon} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="000 000 0000"
              placeholderTextColor="#D9D2B03D"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>
        </View>

        <Button
          title="Sign in"
          fontSize = {16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor = "#8b580f"
          disabledTextColor = "#a2a8a5"
          borderRadius={100}
          width={'100%'}
          height={55}
          onPress={handlePhoneLogin}
          disabled={phoneNumber.length < 8 || phoneNumber.length > 10}
        />

        <View style={styles.or_container}>
          <View style={styles.line} />
          <Text style={styles.or_text}>or</Text>
          <View style={styles.line} />
        </View>

        <Button
          title="Sign in with email"
          fontSize={14}
          fontFamily="Roboto_400"
          backgroundColor="transparent"
          textColor="#D9D2B0"
          borderWidth={1}
          borderColor="#747474"
          borderRadius={100}
          width="100%"
          height={55}
          icon={<EmailIcon width={20} height={20}/>}
          onPress={() => navigation.navigate('LoginEmailScreen')}
        />

        <Button
          title="Sign in with Facebook"
          fontSize={14}
          fontFamily="Roboto_400"
          backgroundColor="transparent"
          textColor="#D9D2B0"
          borderWidth={1}
          borderColor="#747474"
          borderRadius={100}
          width="100%"
          height={55}
          marginTop={15}
          icon={<FacebookIcon width={20} height={20}/>}
          onPress={()=>{}}
        />
        <Button
          title="Sign in with Google"
          fontSize={14}
          fontFamily="Roboto_400"
          backgroundColor="transparent"
          textColor="#D9D2B0"
          borderWidth={1}
          borderColor="#747474"
          borderRadius={100}
          width="100%"
          height={55}
          marginTop={15}
          icon={<GoogleIcon width={20} height={20}/>}
          onPress={handleGoogleLogin}
        />
        <Button
          title="Sign in with Apple"
          fontSize={14}
          fontFamily="Roboto_400"
          backgroundColor="transparent"
          textColor="#D9D2B0"
          borderWidth={1}
          borderColor="#747474"
          borderRadius={100}
          width="100%"
          height={55}
          marginTop={15}
          icon={<AppleIcon width={20} height={20}/>}
        />
        <Text style={styles.footer_text} onPress={() => navigation.navigate('RegisterPhoneScreen')}>
        Don't have an account?{'  '}
          <Text style={styles.sign_up_text}>Sign up</Text>
        </Text>
      </View>
      <View style={styles.bottom_petals_container}>
        <View>
          <Petal2 style={styles.petal2}/>
        </View>
        <View style={styles.bottom_petal_3_4_container}>
          <Petal3/>
          <Petal4/>
        </View>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17261F',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 20,
  },
  top_petals:{
    width: '100%',
    alignItems: 'flex-end',
    paddingEnd: 20,
  },
  petal1: {
    marginBottom: 20,
    marginRight: 20,
  },
  bottom_petals_container: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  petal4: {
    marginTop: 0,
    marginLeft: 50,
  },
  petal5: {
    marginTop: 30,
  },
  content: {
    width: '85%',
    alignItems: 'flex-start',
  },
  title_text: {
    fontFamily: 'GreatMangoDemo',
    color: '#D9D2B0',
    fontWeight: '400',
    lineHeight: 57,
    fontSize: 48,
    letterSpacing: 2,
  },
  subtitle_text: {
    fontFamily: 'Roboto_400',
    color: '#D9D2B0',
    fontSize: 14,
    marginBottom: 50,
  },
  input_container: {
    width: '100%',
    marginBottom: 20,
  },
  phone_number_text: {
    fontFamily: 'Roboto_500',
    color: '#D9D2B0',
    fontSize: 12,
    marginBottom: 5,
  },
  phone_input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2D24',
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
  },
  default_border: {
    borderColor: '#D9D2B0',
  },
  focused_border: {
    borderColor: '#D97904',
  },
  country_picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121D18',
    marginRight: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderEndWidth: 1,
    borderEndColor: '#D9D2B0',
    height: '100%',
    paddingEnd: 10,
    paddingStart: 10,
  },
  icon: {
    marginLeft: 5,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  or_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A372D',
  },
  or_text: {
    fontFamily: 'Roboto_300',
    color: '#D9D2B0',
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
  },
  footer_text: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    textAlign: 'center',
    marginTop: 40,
    width: '100%',
  },
  sign_up_text: {
    fontFamily: 'Roboto_500',
    fontSize: 14,
    color: '#D97904',
    textDecorationLine: 'underline',
  },
});

export default LoginPhoneScreen;
