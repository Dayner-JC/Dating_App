import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Background from '../../../assets/backgrounds/verifi_code_background.svg';
import {useNavigation} from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';

const VerifyCodeChangePhoneScreen = (/*{ route }*/) => {
  //const { uid, email } = route.params;
  const codeLength = 6;
  const [codeArray, setCodeArray] = useState(Array(codeLength).fill(''));
  const [isFocused, setIsFocused] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const inputsRef = useRef([]);
  const navigation = useNavigation();
  const isButtonDisabled = !codeArray.every(char => char !== '');

  //   useEffect(() => {
  //     console.log('UID recibido:', uid);
  //   }, [uid]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const resetState = () => {
    setCodeArray(Array(codeLength).fill(''));
    setIsCodeInvalid(false);
    inputsRef.current[0]?.focus();
  };

  const verifyCode = async () => {
    // try {
    //   const code = codeArray.join('');
    //   const response = await fetch('http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/login/password-reset/verify', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ uid, code }),
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     navigation.navigate('NewPasswordScreen', { uid, email });
    //   } else {
    //     const errorMessage = data.message || 'Invalid code.';
    //     console.log('Error', errorMessage);
    //   }
    // } catch (error) {
    //   setIsCodeInvalid(true);
    //   console.error(error);
    //   Alert.alert('Error', 'An unexpected error occurred.');
    // }
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

    Alert.alert('Code Resent', 'A new verification code has been sent.');
    setAttempts(prev => prev + 1);

    if (attempts === 0) {
      setCooldown(30);
    } else if (attempts === 1) {
      setCooldown(60);
    }

    resetState();
  };

  return (
    <>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
        <Background style={styles.background} />
        <View style={styles.content}>
          <View style={styles.head}>
            <Text style={styles.title}>Verify Code</Text>
            <Text style={styles.subtitle}>
              Enter the verification code that we just sent to your{'\n'}new mobile phone.
            </Text>
          </View>
          <View style={styles.codeContainer}>
            {codeArray.map((_, index) => (
              <TextInput
                value={codeArray[index]}
                key={index}
                ref={ref => (inputsRef.current[index] = ref)}
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
                onChangeText={text => handleCodeChange(text, index)}
              />
            ))}
          </View>
          {isCodeInvalid ? (
            <Text style={styles.errorText}>
              Unexpected code. Please Try Again
            </Text>
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
              title="Verify and Save"
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
              onPress={verifyCode}
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
    width: 50,
    height: 58,
    borderWidth: 1,
    borderColor: '#747474',
    borderRadius: 8,
    color: '#D9D2B0',
    fontSize: 24,
    backgroundColor: '#17261F',
    textAlign: 'center',
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

export default VerifyCodeChangePhoneScreen;
