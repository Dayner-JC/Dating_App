/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/button';
import auth from '@react-native-firebase/auth';
import GoogleIcon from '../../../assets/icons/google.svg';
import FacebookIcon from '../../../assets/icons/facebook.svg';
import AppleIcon from '../../../assets/icons/apple.svg';
import HideIcon from '../../../assets/icons/hide.svg';
import ShowIcon from '../../../assets/icons/show.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_9.svg';
import Petal4 from '../../../assets/splash_screen_flower/petals/petal_10.svg';
import PhoneIcon from '../../../assets/icons/phone.svg';
import {
  validateGoogleLogin,
  validateFacebookLogin,
  validateAppleLogin,
} from '../../../infrastructure/auth/validation/login_validation';

const LoginEmailScreen = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const isEmailValid = email.endsWith('@gmail.com') && /.+@gmail\.com/.test(email);
  const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);

  const handlePasswordToggle = () => setShowPassword((prev) => !prev);

  const handleContinue = async () => {
    if (step === 1 && isEmailValid) {
      setStep(2);
    } else if (step === 2 && isPasswordValid) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (user) {
          const idToken = await user.getIdToken();
          const uid = user.uid;

          console.log('Token obtained:', idToken);
          console.log('UID obtained:', uid);

          const response = await fetch('http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/login/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: idToken, uid: uid }),
          });

          const data = await response.json();

          if (data.success) {
            navigation.navigate('Main', { userData: data.user });
          } else {
            Alert('User not found');
          }
        } else {
          Alert('Failed to obtain user');
        }
      } catch (error) {
        console.error(error);
        Alert('Failed to sign in');
      }
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const result = await validateGoogleLogin();
      if (result?.success) {
        navigation.navigate('Main');
      } else {
        Alert.alert('Login Failed', 'Google login failed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during Google login.');
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

          {step === 1 && (
              <View style={styles.input_container}>
                <Text style={styles.email_text}>Email</Text>
                <View
                  style={[
                    styles.email_input_container,
                    isFocused ? styles.focused_border : styles.default_border,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    placeholderTextColor="#D9D2B03D"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </View>
              </View>
            )}
            {step === 2 && (
              <View style={styles.input_container}>
                <Text style={styles.email_text}>Password</Text>
                <View
                  style={[
                    styles.email_input_container,
                    isFocused ? styles.focused_border : styles.default_border,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#D9D2B03D"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                  {password.length > 0 && (
                    <TouchableOpacity
                      style={styles.toggle_password_visibility}
                      onPress={handlePasswordToggle}
                    >
                      {showPassword ? (
                    <HideIcon width={20} height={20} />
                  ) : (
                    <ShowIcon width={20} height={20} />
                  )}
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            <View style={styles.forgot_container}>
            {password.length > 0 && (
                <Text style={styles.forgot_text} onPress={() => navigation.navigate('VerifyCodeEmailScreen')}>Forgot your password?</Text>
            )}
            </View>

            <Button
              title={step === 1 ? 'Sign in' : 'Continue'}
              fontSize={16}
              fontFamily="Roboto_500"
              backgroundColor="#D97904"
              disabledBackgroundColor="#8b580f"
              disabledTextColor="#a2a8a5"
              borderRadius={100}
              width={'100%'}
              height={55}
              marginTop={20}
              onPress={handleContinue}
              disabled={(step === 1 && !isEmailValid) || (step === 2 && !isPasswordValid)}
            />

        <View style={styles.or_container}>
          <View style={styles.line} />
          <Text style={styles.or_text}>or</Text>
          <View style={styles.line} />
        </View>

        <Button
              title="Sign in with phone"
              fontSize={14}
              fontFamily="Roboto_400"
              backgroundColor="transparent"
              textColor="#D9D2B0"
              borderWidth={1}
              borderColor="#747474"
              borderRadius={100}
              width="100%"
              height={55}
              icon={<PhoneIcon width={20} height={20} />}
              onPress={() => navigation.navigate('LoginPhoneScreen')}
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
          onPress={() => {}}
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
        <Text style={styles.footer_text} onPress={() => navigation.navigate('RegisterEmailScreen')}>
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
  forgot_container: {
    width: '100%',
    alignItems: 'flex-end',
  },
  forgot_text: {
    fontFamily: 'Roboto_500',
    color: '#D97904',
    fontSize: 14,
    textDecorationLine: 'underline',
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
    marginBottom: 5,
  },
  email_text: {
    fontFamily: 'Roboto_500',
    color: '#D9D2B0',
    fontSize: 12,
    marginBottom: 5,
  },
  email_input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2D24',
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    paddingHorizontal: 16,
  },
  default_border: {
    borderColor: '#D9D2B0',
  },
  focused_border: {
    borderColor: '#D97904',
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
});

export default LoginEmailScreen;
