import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { validateAndSendAccount } from './infrastructure/auth/register/account_validation';

const CreateAccountForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [uploadedPhotoURL, setUploadedPhotoURL] = useState(null);

  const handlePickImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'You cancelled the image picker.');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    const formData = { name, email, password, confirmPassword, photo };

    const result = await validateAndSendAccount(formData);

    if (result.success) {
      Alert.alert('Success', 'Your account has been created successfully!');
      setUploadedPhotoURL(result.data.photoURL); // Guarda la URL de la imagen subida
    } else {
      const { errors } = result;
      if (errors.name) {
        Alert.alert('Validation Error', `Name: ${errors.name}`);
      }
      if (errors.email) {
        Alert.alert('Validation Error', `Email: ${errors.email}`);
      }
      if (errors.password) {
        Alert.alert('Validation Error', `Password: ${errors.password}`);
      }
      if (errors.confirmPassword) {
        Alert.alert('Validation Error', `Confirm Password: ${errors.confirmPassword}`);
      }
      if (errors.backend) {
        Alert.alert('Backend Error', errors.backend);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Confirm Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity onPress={handlePickImage} style={styles.photoButton}>
        <Text style={styles.photoButtonText}>Pick a Profile Picture</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={styles.photo} />}

      <Button title="Create Account" onPress={handleSubmit} />

      {uploadedPhotoURL && (
        <>
          <Text style={styles.successMessage}>Image Uploaded Successfully!</Text>
          <Image source={{ uri: uploadedPhotoURL }} style={styles.photo} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  photoButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 15,
  },
  photoButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default CreateAccountForm;
