import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Button from '../components/button';
import VerifyCodeAppBar from '../main/appBars/verify_code_appBar';
import Background from '../../assets/backgrounds/verifi_code_background.svg';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { handlePhoneRegister } from '../../infrastructure/auth/register/register_phone';

const VerifyCodeScreen  = ({ route }) => {
    const codeLength = 6;
    const [codeArray, setCodeArray] = useState(Array(codeLength).fill(''));
    const [isFocused, setIsFocused] = useState(false);
    const inputsRef = useRef([]);
    const navigation = useNavigation();
    const { phoneNumber, callingCode, verificationId } = route.params;
    const isButtonDisabled = !codeArray.every((char) => char !== '');

    const handleCodeChange = (text, index) => {
      const newCodeArray = [...codeArray];
      newCodeArray[index] = text;

      if (text.length > 0 && index < codeLength - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      if (text === '' && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }

      setCodeArray(newCodeArray);
    };

    const handleResendCode = async () => {
      const newVerificationId = await handlePhoneRegister(callingCode, phoneNumber);
      if (newVerificationId) {
        Alert.alert('Code Resent', 'A new verification code has been sent.');
      } else {
        Alert.alert('Error', 'Code Resent Error');
      }
    };

    const handleVerifyCode = async () => {
      const verificationCode = codeArray.join('');
      if (verificationCode.length !== codeLength) {
        Alert.alert('Invalid Code', 'Please enter the full verification code.');
        return;
      }

      try {
        const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);

        const userCredential = await auth().signInWithCredential(credential);

        const firebaseIdToken = await userCredential.user.getIdToken();

        const response = await fetch(
          'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/register/phone',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: firebaseIdToken,
              phoneNumber,
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          navigation.navigate('CompleteProfile');
        } else {
          Alert.alert('Error', 'Failed to complete phone login.');
        }
      } catch (error) {
        console.error('Verification Error:', error);
        Alert.alert('Verification Failed', error.message);
      }
    };

  return (
    <>
    <StatusBar backgroundColor="#17261F"/>

    <View style={styles.container}>
      <View style={styles.appBar}>
          <VerifyCodeAppBar/>
      </View>
    <Background style={styles.background}/>
        <View style={styles.content}>
        <View style={styles.head}>
            <Text style={styles.title}>Verify Code</Text>
            <Text style={styles.subtitle}>
                Enter the verification code that we just sent to your{'\n'}mobile phone.
            </Text>
        </View>
      <View style={styles.codeContainer}>
        {codeArray.map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputsRef.current[index] = ref)}
            style={[ styles.input, isFocused && styles.inputFocused ]}
            placeholder="-"
            placeholderTextColor="#D9D2B0"
            maxLength={1}
            keyboardType="number-pad"
            textAlign="center"
            onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            onChangeText={(text) => handleCodeChange(text, index)}
          />
        ))}
      </View>
      <View style={styles.resendContainer}>
          <Text style={styles.normalText}>Didn’t get a code? </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendText}>Resend code</Text>
          </TouchableOpacity>
        </View>
        <Button
            title="Verify"
            fontSize={16}
            fontFamily="Roboto_500"
            backgroundColor="#D97904"
            disabledBackgroundColor = "#8b580f"
            disabledTextColor = "#a2a8a5"
            borderRadius={100}
            width={'100%'}
            height={55}
            marginTop={40}
            disabled={isButtonDisabled}
            onPress={handleVerifyCode}
          />
          </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#17261F',
    alignItems: 'center',
  },
  appBar: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  content: {
    width: '85%',
  },
  head: {
    marginTop: 40,
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 40,
    color: '#D9D2B0',
  },
  subtitle: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    marginTop: 10,
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  input: {
    width: 45,
    height: 58,
    borderWidth: 1,
    borderColor: '#747474',
    borderRadius: 8,
    color: '#D9D2B0',
    fontSize: 24,
    backgroundColor: '#17261F',
  },
  inputFocused: {
    borderColor: '#D9D2B0',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  normalText: {
    fontFamily: 'Roboto_400',
    fontSize: 13,
    color: '#D9D2B0',
  },
  resendText: {
    fontFamily: 'Roboto_400',
    fontSize: 13,
    color: '#D97904',
    textDecorationLine: 'underline',
  },
});

export default VerifyCodeScreen;
