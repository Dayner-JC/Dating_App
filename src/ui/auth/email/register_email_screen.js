/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/button';
import GoogleIcon from '../../../assets/icons/google.svg';
import FacebookIcon from '../../../assets/icons/facebook.svg';
import AppleIcon from '../../../assets/icons/apple.svg';
import PhoneIcon from '../../../assets/icons/phone.svg';
import HideIcon from '../../../assets/icons/hide.svg';
import ShowIcon from '../../../assets/icons/show.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { registerWithGoogle } from '../../../infrastructure/auth/register/register_google';
//import { registerWithFacebook } from '../../infrastructure/auth/register/register_facebook';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_12.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_13.svg';
import Petal4 from '../../../assets/splash_screen_flower/petals/petal_14.svg';

const RegisterEmailScreen = () => {
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);

    const isEmailValid = email.endsWith('@gmail.com') && /.+@gmail\.com/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);

    const handlePasswordToggle = () => setShowPassword((prev) => !prev);

    const handleContinue = () => {
        if (step === 1 && isEmailValid) {
            setStep(2);
          } else if (step === 2 ) {
           navigation.navigate('PhoneAfterEmail', {email, password});
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
            <Petal1 style={styles.petal1} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title_text}>Sign up</Text>
            <Text style={styles.subtitle_text}>Enter your email to create your account.</Text>
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

            <Button
              title={step === 1 ? 'Sign up' : 'Continue'}
              fontSize={16}
              fontFamily="Roboto_500"
              backgroundColor="#D97904"
              disabledBackgroundColor="#8b580f"
              disabledTextColor="#a2a8a5"
              borderRadius={100}
              width={'100%'}
              height={55}
              onPress={handleContinue}
              disabled={(step === 1 && !isEmailValid) || (step === 2 && !isPasswordValid)}
            />
            <View style={styles.or_container}>
              <View style={styles.line} />
              <Text style={styles.or_text}>or</Text>
              <View style={styles.line} />
            </View>
            <Button
              title="Sign up with phone"
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
              onPress={() => navigation.navigate('RegisterPhoneScreen')}
            />
            <Button
              title="Sign up with Facebook"
              fontSize={14}
              fontFamily="Roboto_400"
              backgroundColor="transparent"
              textColor="#D9D2B0"
              borderWidth={1}
              borderColor="#747474"
              borderRadius={100}
              marginTop={15}
              width="100%"
              height={55}
              icon={<FacebookIcon width={20} height={20} />}
            />
            <Button
              title="Sign up with Google"
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
              icon={<GoogleIcon width={20} height={20} />}
              onPress={() => registerWithGoogle(navigation)}
            />
            <Button
              title="Sign up with Apple"
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
              icon={<AppleIcon width={20} height={20} />}
            />
            <Text
              style={styles.footer_text}
              onPress={() => navigation.navigate('LoginEmailScreen')}
            >
              Already have an account?{' '}
              <Text style={styles.sign_up_text}>Sign in</Text>
            </Text>
          </View>
          <View style={styles.bottom_petals_container}>
            <View>
              <Petal2 style={styles.petal2} />
            </View>
            <View style={styles.bottom_petal_3_4_container}>
              <Petal3 />
              <Petal4 />
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
    marginBottom: 25,
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
    borderColor: '#D9D2B0',
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
    alignItems: 'flex-start',
    paddingStart: 20,
  },
  petal1: {
    marginBottom: 30,
  },
  bottom_petals_container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  bottom_petal_3_4_container: {
    flexDirection: 'row',
    marginTop: 40,
  },
  petal2: {
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

export default RegisterEmailScreen;
