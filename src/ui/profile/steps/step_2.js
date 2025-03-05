import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../../components/button';

const Step2 = ({ onNext, onChangeData }) => {
  const codeLength = 8;
  const [codeArray, setCodeArray] = useState(Array(codeLength).fill(''));
  const [isFocused, setIsFocused] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState('');
  const [age, setAge] = useState(null);
  const inputsRef = useRef([]);

  const handleCodeChange = (text, index) => {
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

  const validateDate = (month, day, year) => {
    const monthNumber = parseInt(month, 10);
    const dayNumber = parseInt(day, 10);
    const yearNumber = parseInt(year, 10);

    if (
      isNaN(monthNumber) || isNaN(dayNumber) || isNaN(yearNumber) ||
      monthNumber < 1 || monthNumber > 12 ||
      dayNumber < 1 || dayNumber > 31 ||
      yearNumber < 1900
    ) {
      return false;
    }

    const daysInMonth = [
      31,
      (yearNumber % 4 === 0 && yearNumber % 100 !== 0) || yearNumber % 400 === 0 ? 29 : 28,
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
    ];
    if (dayNumber > daysInMonth[monthNumber - 1]) {
      return false;
    }

    return true;
  };

  const calculateAge = (month, day, year) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const month = codeArray.slice(0, 2).join('');
    const day = codeArray.slice(2, 4).join('');
    const year = codeArray.slice(4).join('');

    if (month.length < 2 || day.length < 2 || year.length < 4) {
      setError('');
      setIsButtonDisabled(true);
      setAge(null);
      return;
    }

    const isValid = validateDate(month, day, year);
    if (!isValid) {
      setError('Invalid date. Please enter a valid date.');
      setIsButtonDisabled(true);
      setAge(null);
      return;
    }

    const calculatedAge = calculateAge(parseInt(month, 10), parseInt(day, 10), parseInt(year, 10));
    setAge(calculatedAge);

    if (calculatedAge < 18) {
      setError('You must be at least 18 years old to continue.');
      setIsButtonDisabled(true);
    } else {
      setError('');
      setIsButtonDisabled(false);
    }
  }, [codeArray]);

  const handleContinue = () => {
    const month = codeArray.slice(0, 2).join('');
    const day = codeArray.slice(2, 4).join('');
    const year = codeArray.slice(4).join('');
    const dateOfBirth = `${month}/${day}/${year}`;

    onChangeData('birthday', dateOfBirth);
    onNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Birthday</Text>
        <Text style={styles.subtitle}>What’s your date of birth?</Text>
        <View style={styles.codeContainer}>
          {codeArray.slice(0, 2).map((_, index) => (
            <TextInput
              value={codeArray[index]}
              key={index}
              ref={(ref) => (inputsRef.current[index] = ref)}
              style={[
                styles.input,
                isFocused && styles.inputFocused,
                error && styles.inputError,
              ]}
              placeholder="M"
              placeholderTextColor="#D9D2B080"
              maxLength={1}
              keyboardType="number-pad"
              textAlign="center"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={(text) => handleCodeChange(text, index)}
            />
          ))}
          <View style={styles.groupSpacing} />
          {codeArray.slice(2, 4).map((_, index) => (
            <TextInput
              value={codeArray[index + 2]}
              key={index + 2}
              ref={(ref) => (inputsRef.current[index + 2] = ref)}
              style={[
                styles.input,
                isFocused && styles.inputFocused,
                error && styles.inputError,
              ]}
              placeholder="D"
              placeholderTextColor="#D9D2B080"
              maxLength={1}
              keyboardType="number-pad"
              textAlign="center"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={(text) => handleCodeChange(text, index + 2)}
            />
          ))}
          <View style={styles.groupSpacing} />
          {codeArray.slice(4).map((_, index) => (
            <TextInput
              value={codeArray[index + 4]}
              key={index + 4}
              ref={(ref) => (inputsRef.current[index + 4] = ref)}
              style={[
                styles.input,
                isFocused && styles.inputFocused,
                error && styles.inputError,
              ]}
              placeholder="A"
              placeholderTextColor="#D9D2B080"
              maxLength={1}
              keyboardType="number-pad"
              textAlign="center"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={(text) => handleCodeChange(text, index + 4)}
            />
          ))}
        </View>

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
          disabled={isButtonDisabled}
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
  codeContainer: {
    flexDirection: 'row',
    marginTop: 35,
    justifyContent: 'space-between',
  },
  input: {
    width: 32,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#747474',
    color: '#D9D2B0',
    fontSize: 18,
    backgroundColor: '#17261F',
    textAlign: 'center',
  },
  inputFocused: {
    borderBottomColor: '#D97904',
  },
  inputError: {
    borderBottomColor: '#FF626E',
  },
  groupSpacing: {
    width: 10,
  },
  errorMessage: {
    fontFamily: 'Roboto_400',
    color: '#FF626E',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Step2;
