import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, StatusBar, TouchableOpacity } from 'react-native';
import Button from '../../components/button';
import VerifyCodeAppBar from '../../main/appBars/verify_code_appBar';
import Background from '../../../assets/backgrounds/verifi_code_background.svg';
import { verify2FAToken } from '../../../infrastructure/auth/2fa/app_fetchAndverify';

const TwoFAAuthenticatorVerifyScreen = ({ route, navigation }) => {
  const { userId, firstTime } = route.params;
  const codeLength = 6;
  const [codeArray, setCodeArray] = useState(Array(codeLength).fill(''));
  const [isFocused, setIsFocused] = useState(false);
  const [isCodeInvalid, setIsCodeInvalid] = useState(false);
  const inputsRef = useRef([]);
  const isButtonDisabled = !codeArray.every((char) => char !== '');

  const resetState = () => {
    setCodeArray(Array(codeLength).fill(''));
    setIsCodeInvalid(false);
    inputsRef.current[0]?.focus();
  };

  const handleVerify = async () => {
    try {
      const token = codeArray.join('');
      const response = await verify2FAToken(userId, token, firstTime);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to enable SMS 2FA.');
      }

      navigation.navigate('Main');
    } catch (error) {
      console.error('Error verifying 2FA token:', error);
      setIsCodeInvalid(true);
      Alert.alert('Error', error.message || 'Invalid or expired 2FA code.');
    }
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
              Enter the verification code from your authentication app.
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
            <TouchableOpacity onPress={resetState}>
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          ) : (
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
              onPress={handleVerify}
            />
          )}
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
  inputError: {
    borderBottomColor: '#FF626E',
  },
  errorText: {
    color: '#FF626E',
    textAlign: 'center',
  },
  tryAgainText: {
    fontFamily: 'Roboto_400',
    fontSize: 16,
    color: '#D97904',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default TwoFAAuthenticatorVerifyScreen;
