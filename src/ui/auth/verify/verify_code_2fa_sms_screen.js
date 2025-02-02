import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Button from '../../components/button';
import Background from '../../../assets/backgrounds/verifi_code_background.svg';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { handlePhoneRegister } from '../../../infrastructure/auth/register/register_phone';
import API_BASE_URL from '../../../config/config';

const VerifyCode2FaSmsScreen = ({ route }) => {
  const codeLength = 6;
  const [codeArray, setCodeArray] = useState(Array(codeLength).fill(''));
  const [isFocused, setIsFocused] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const inputsRef = useRef([]);
  const navigation = useNavigation();
  const { userPhoneNumber, confirmationId, userId } = route.params;
  const isButtonDisabled = !codeArray.every((char) => char !== '');

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const resetState = () => {
    setCodeArray(Array(codeLength).fill(''));
    setIsCodeInvalid(false);
    inputsRef.current[0]?.focus();
  };

  const handleCodeChange = (text, index) => {
    setIsCodeInvalid(false);
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
    if (cooldown > 0 || attempts >= 3) {
      return;
    }

    const newVerificationId = await handlePhoneRegister(userPhoneNumber);
    if (newVerificationId) {
      Alert.alert('Code Resent', 'A new verification code has been sent.');
      setIsCodeInvalid(false);
      setAttempts((prev) => prev + 1);

      if (attempts === 0) {
        setCooldown(30);
      } else if (attempts === 1) {
        setCooldown(60);
      }

      resetState();
    } else {
      Alert.alert('Error', 'Code Resent Error');
    }
  };

  const handleVerifyCode = async () => {
    const verificationCode = codeArray.join('');

    try {
        const credential = auth.PhoneAuthProvider.credential(confirmationId, verificationCode);
        await auth().signInWithCredential(credential);

        const response = await fetch(
          `${API_BASE_URL}/auth/2fa/update-sms`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId }),
          }
        );

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Failed to enable SMS 2FA.');
        }

        navigation.navigate('Main');
      } catch (error) {
        setIsCodeInvalid(true);
        console.error('Verification failed:', error);
        Alert.alert('Error', 'Invalid verification code.');
      }
  };

  return (
    <>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.container}>
      <View style={styles.appBar}>
         <IconButton icon={<ArrowIcon />} onPress={()=>{}} />
      </View>
        <Background style={styles.background} />
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
                value={codeArray[index]}
                key={index}
                ref={(ref) => (inputsRef.current[index] = ref)}
                style={[
                  styles.input,
                  isFocused && styles.inputFocused,
                  isCodeInvalid && styles.inputError,
                ]}
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
          {isCodeInvalid ? (
            <Text style={styles.errorText}>Unexpected code. Please Try Again</Text>
          ) : (
            attempts < 3 && (
              <View style={styles.resendContainer}>
                <Text style={styles.normalText}>Didn’t get a code? </Text>
                {cooldown > 0 ? (
                  <Text style={styles.cooldownText}>
                    {`${Math.floor(cooldown / 60)}:${(cooldown % 60)
                      .toString()
                      .padStart(2, '0')}`}
                  </Text>
                ) : (
                  <TouchableOpacity onPress={handleResendCode}>
                    <Text style={styles.resendText}>Resend code</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          )}
          {!isCodeInvalid ? (
            <Button
              title="Verify"
              fontSize={16}
              fontFamily="Roboto_500"
              backgroundColor="#D97904"
              disabledBackgroundColor="#8b580f"
              disabledTextColor="#a2a8a5"
              borderRadius={100}
              width={'100%'}
              height={55}
              marginTop={40}
              disabled={isButtonDisabled}
              onPress={handleVerifyCode}
            />
          ) : attempts < 3 ? (
            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendButtonText}>Resend Code</Text>
            </TouchableOpacity>
          ) : null}
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
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#17261F',
    width: '100%',
    paddingStart: 10,
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
    width: 50,
    height: 58,
    borderBottomWidth: 1,
    borderBottomColor: '#747474',
    color: '#D9D2B0',
    fontSize: 24,
    backgroundColor: '#17261F',
    textAlign: 'center',
  },
  inputFocused: {
    borderBottomColor: '#D9D2B0',
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
  cooldownText: {
    fontFamily: 'Roboto_400',
    fontSize: 13,
    color: '#D97904',
  },
  inputError: {
    borderColor: '#FF626E',
  },
  errorText: {
    color: '#FF626E',
    textAlign: 'center',
  },
  resendButtonText: {
    fontFamily: 'Roboto_400',
    fontSize: 13,
    color: '#D97904',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default VerifyCode2FaSmsScreen;
