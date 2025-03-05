/* eslint-disable no-catch-shadow */
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';
import Background from '../../../assets/backgrounds/edits.svg';

const EditName = ({ route }) => {
  const navigation = useNavigation();
  const { uid } = route.params;
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const validateName = useCallback((input) => {
    const regex = /^[A-Za-z\s]*$/;
    return regex.test(input.trim());
  }, []);

  const handleTextChange = (text) => {
    setName(text);

    if (!validateName(text)) {
      setError('Please enter a valid name.');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile/request-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: uid,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setName(data.name || '');
        } else {
          Alert.alert('Error', data.error || 'Failed to load user data.');
        }
      } catch (Error) {
        Alert.alert('Error', 'Failed to load user data.');
      }
    };

    fetchUserData();
  }, [uid]);

  const handleSaveChanges = async () => {
    if (validateName(name)) {
      try {
        const response = await fetch(`${API_BASE_URL}/profile/edit/edit-name`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: uid,
            name: name,
          }),
        });

        const data = await response.json();

        if (data.success) {
          navigation.goBack();
        } else {
          Alert.alert(data.error || 'Error updating name.');
        }
      } catch (Error) {
        console.error('Error updating name:', error);
        Alert.alert('Failed to update name.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <Background style={styles.background} />
      <View style={styles.content}>
        <Text style={styles.title}>Edit Name</Text>
        <Text style={styles.subtitle}>What's your name?</Text>

        <View style={styles.input_container}>
          <Text style={styles.yourName_text}>Your name</Text>
          <TextInput
            style={[
              styles.input,
              isFocused && styles.inputFocused,
              error && styles.inputError,
            ]}
            placeholder="Max"
            value={name}
            onChangeText={handleTextChange}
            placeholderTextColor={'#D9D2B080'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        </View>

        <Button
          title="Save changes"
          fontSize={16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width={'100%'}
          height={55}
          onPress={handleSaveChanges}
          disabled={!validateName(name)}
        />
        <Button
          title="Cancel"
          fontFamily="Roboto_500"
          fontSize={16}
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="#747474"
          textColor="#D9D2B0"
          borderRadius={100}
          height={55}
          marginTop={10}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#17261F',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#17261F',
    width: '100%',
    paddingStart: 10,
    zIndex: 1,
  },
  content: {
    width: '85%',
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
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 40,
    color: '#D9D2B0',
    textAlign: 'left',
    marginTop: 40,
  },
  subtitle: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    textAlign: 'left',
    marginTop: 10,
  },
  yourName_text: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    textAlign: 'left',
    marginBottom: 5,
  },
  input: {
    fontFamily: 'Roboto_400',
    borderWidth: 1,
    borderColor: '#525853',
    color: '#FFFFFF',
    height: 56,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#17261F',
    fontSize: 16,
  },
  input_container: {
    marginVertical: 35,
  },
  inputFocused: {
    borderColor: '#D97904',
  },
  inputError: {
    borderColor: '#FF626E',
  },
  errorMessage: {
    fontFamily: 'Roboto_400',
    color: '#FF626E',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default EditName;
