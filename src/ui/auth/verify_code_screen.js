import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const VerificationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { phoneNumber, verificationId } = route.params;
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerifyCode = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);

      const userCredential = await auth().signInWithCredential(credential);

      const firebaseIdToken = await userCredential.user.getIdToken();

      const response = await fetch('http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/register/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: firebaseIdToken,
          phoneNumber,
        }),
      });

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
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        Sent to {phoneNumber}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="123456"
        keyboardType="number-pad"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button title="Verify Code" onPress={handleVerifyCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginVertical: 8 },
  input: { borderWidth: 1, padding: 10, width: '80%', marginVertical: 10 },
});

export default VerificationScreen;
