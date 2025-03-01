import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../../components/button';

const Step1 = ({ onNext, onChangeData }) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const validateName = useCallback((input) => {
    const regex = /^[A-Z][a-zA-Z]{2,}$/;
    return regex.test(input.trim());
  }, []);

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
      <Text style={styles.subtitle}>What's your name? We'd love to know you better!</Text>

      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder="Introduce your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor={'#D9D2B080'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

        <Button
          title="Continue"
          fontSize = {16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor = "#8b580f"
          disabledTextColor = "#a2a8a5"
          borderRadius={100}
          width={'100%'}
          height={55}
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
    height: '56',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#17261F',
    fontSize: 16,
    marginVertical: 35,
  },
  inputFocused: {
    borderColor: '#D97904',
  },
  petalsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  singlePetal: {
    flex: 1,
  },
  doublePetals: {
    flex: 1,
    flexDirection: 'row',
  },
  petal1: {
    marginStart: 10,
    marginBottom: 60,
  },
  petal2: {
    marginTop: 60,
  },
  petal3: {
    marginLeft: 60,
    marginTop: 20,
  },
});

export default Step1;
