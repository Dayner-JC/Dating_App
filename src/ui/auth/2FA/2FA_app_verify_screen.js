import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Button } from 'react-native';
import { verify2FAToken } from '../../../infrastructure/auth/2fa/app_fetchAndverify';

const TwoFAAuthenticatorVerifyScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [token, setToken] = useState('');

  const handleVerify = async () => {
    try {
      const response = await verify2FAToken(userId, token);
      if(response.ok){
      Alert.alert('Success', '2FA has been successfully enabled.');
    }
    } catch (error) {
      console.error('Error verifying 2FA token:', error);
      Alert.alert('Error', 'Invalid or expired 2FA code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the code from your app"
        value={token}
        onChangeText={setToken}
        keyboardType="numeric"
      />
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
});

export default TwoFAAuthenticatorVerifyScreen;
