/* eslint-disable no-catch-shadow */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';
import Background from '../../../assets/backgrounds/edits.svg';

const EditBirthday = ({ route }) => {
  const navigation = useNavigation();
  const { uid } = route.params;
  const codeLength = 8;
  const [codeArray, setCodeArray] = useState(Array(codeLength).fill(''));
  const [isFocused, setIsFocused] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState('');
  const inputsRef = useRef([]);

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
          const birthday = data.birthday || '';
          if (birthday) {
            const [month, day, year] = birthday.split('/');
            const newCodeArray = [
              month[0] || '', month[1] || '',
              day[0] || '', day[1] || '',
              year[0] || '', year[1] || '', year[2] || '', year[3] || '',
            ];
            setCodeArray(newCodeArray);
          }
        } else {
          Alert.alert('Error', data.error || 'Failed to load user data.');
        }
      } catch (Error) {
        Alert.alert('Error', 'Failed to load user data.');
      }
    };

    fetchUserData();
  }, [uid]);

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

  useEffect(() => {
    const month = codeArray.slice(0, 2).join('');
    const day = codeArray.slice(2, 4).join('');
    const year = codeArray.slice(4).join('');

    if (month.length < 2 || day.length < 2 || year.length < 4) {
      setError('');
      setIsButtonDisabled(true);
      return;
    }

    const isValid = validateDate(month, day, year);
    if (!isValid) {
      setError('Invalid date. Please enter a valid date.');
      setIsButtonDisabled(true);
      return;
    }

    const age = calculateAge(parseInt(month, 10), parseInt(day, 10), parseInt(year, 10));

    if (age < 18) {
      setError('You must be at least 18 years old.');
      setIsButtonDisabled(true);
    } else {
      setError('');
      setIsButtonDisabled(false);
    }
  }, [codeArray]);

  const handleContinue = async () => {
    const month = codeArray.slice(0, 2).join('');
    const day = codeArray.slice(2, 4).join('');
    const year = codeArray.slice(4).join('');
    const dateOfBirth = `${month}/${day}/${year}`;

    try {
      const response = await fetch(`${API_BASE_URL}/profile/edit/edit-birthday`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: uid,
          birthday: dateOfBirth,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigation.goBack();
      } else {
        Alert.alert(data.error || 'Error updating birthday.');
      }
    } catch (Error) {
      console.error('Error updating birthday:', error);
      Alert.alert('Failed to update birthday.');
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
        <Text style={styles.title}>Edit Birthday</Text>
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
          title="Save changes"
          fontSize={16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width={'100%'}
          height={55}
          marginTop={50}
          onPress={handleContinue}
          disabled={isButtonDisabled}
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
    marginTop: 50,
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
    marginBottom: 10,
  },
});

export default EditBirthday;
