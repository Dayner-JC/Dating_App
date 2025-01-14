/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Button from '../../components/button';
import VerifyCodeAppBar from '../../main/appBars/verify_code_appBar';
import Background from '../../../assets/backgrounds/verifi_code_background.svg';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { handlePhoneRegister } from '../../../infrastructure/auth/register/register_phone';

const VerifyCodeScreen = ({ route }) => {
  const codeLength = 6;
  const [codeArray, setCodeArray] = useState(Array(codeLength).fill(''));
  const [isFocused, setIsFocused] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const inputsRef = useRef([]);
  const navigation = useNavigation();
  const { phoneNumber, callingCode, verificationId, login, email, password, uid } = route.params;
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

    const newVerificationId = await handlePhoneRegister(callingCode, phoneNumber);
    if (newVerificationId) {
      Alert.alert('Code Resent', 'A new verification code has been sent.');
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
    if (verificationCode.length !== codeLength) {
      Alert.alert('Invalid Code', 'Please enter the full verification code.');
      return;
    }

    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);

      const currentUser = auth().currentUser;

      if (currentUser) {
        try {
          const phoneProvider = currentUser.providerData.find(
            (provider) => provider.providerId === auth.PhoneAuthProvider.PROVIDER_ID
          );

          if (phoneProvider) {
            console.log('Phone number already linked.');
            const userCredential = await auth().signInWithCredential(credential);
            const firebaseIdToken = await userCredential.user.getIdToken();
            const completePhoneNumber = `${callingCode}${phoneNumber}`;

            const requestBody = {
              firebaseIdToken,
              completePhoneNumber,
              uid: userCredential.user.uid,
              email: email || null,
            };

            const endpoint = login
              ? 'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/login/phone'
              : 'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/register/phone';

            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (data.success) {
              navigation.navigate(login ? 'Main' : 'CreateProfileScreen');
            } else {
              Alert.alert('Error', 'User does not exist or invalid credentials.');
            }
          } else {
            await currentUser.linkWithCredential(credential);

            const firebaseIdToken = await currentUser.getIdToken();
            const completePhoneNumber = `${callingCode}${phoneNumber}`;

            const requestBody = {
              firebaseIdToken,
              completePhoneNumber,
              uid: currentUser.uid,
              email,
            };

            const response = await fetch(
              'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/register/phone',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
              }
            );

            const data = await response.json();

            if (data.success) {
              console.log('Phone registration completed.');
              navigation.navigate('CreateProfileScreen');
            } else {
              Alert.alert('Error', 'Failed to complete phone registration.');
            }
          }
        } catch (error) {
          console.error('Error linking phone number:', error);
          Alert.alert('Error', 'Failed to link phone number.');
        }
      } else {
        // Si el usuario no está autenticado con correo y contraseña, proceder con login/registro solo con el número de teléfono
        console.log('Registering or logging in with phone number only.');

        const userCredential = await auth().signInWithCredential(credential);
        const firebaseIdToken = await userCredential.user.getIdToken();
        const completePhoneNumber = `${callingCode}${phoneNumber}`;

        const requestBody = {
          firebaseIdToken,
          completePhoneNumber,
          uid: userCredential.user.uid,
          email: email || null,
        };

        const endpoint = login
          ? 'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/login/phone'
          : 'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/register/phone';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (data.success) {
          console.log(data);
          navigation.navigate(login ? 'Main' : 'CreateProfileScreen');
        } else {
          setIsCodeInvalid(true);
          Alert.alert('Error', 'User does not exist or invalid credentials.');
        }
      }
    } catch (error) {
      console.error('Verification Error:', error);
      setIsCodeInvalid(true);
      Alert.alert('Error', 'An error occurred during verification.');
    }
  };


  return (
    <>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.container}>
        <View style={styles.appBar}>
          <VerifyCodeAppBar />
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

export default VerifyCodeScreen;
