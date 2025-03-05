import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../../components/button';

const Step1 = ({ onNext, onChangeData }) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const validateName = useCallback((input) => {
    const regex = /^[A-Za-z]*$/;
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

  const handleContinue = () => {
    if (validateName(name)) {
      onChangeData('name', name);
      onNext();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Name</Text>
        <Text style={styles.subtitle}>
          What's your name? We'd love to know you better!
        </Text>

        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
          ]}
          placeholder="Introduce your name"
          value={name}
          onChangeText={handleTextChange}
          placeholderTextColor={'#D9D2B080'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

        <Button
          title="Continue"
          fontSize={16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width={'100%'}
          height={55}
          marginTop={35}
          onPress={handleContinue}
          disabled={!validateName(name)}
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
  },
  content: {
    width: '85%',
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
    marginTop: 35,
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
  },
});

export default Step1;
