import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../../components/button';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';

const Step8 = ({ onNext }) => {
  const [userInfo, setUserInfo] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const minLength = 10;
  const maxLength = 200;

  const handleChangeText = (text) => {
    setUserInfo(text);
  };

  const handleFocus = () => {
    setInputFocus(true);
  };

  const handleBlur = () => {
    setInputFocus(false);
  };

  const isButtonDisabled = userInfo.length < minLength || userInfo.length > maxLength;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About you</Text>
        <Text style={styles.subtitle}>Tell us about yourself! Share who you are and what makes you unique.</Text>

        <TextInput
          style={[styles.input, inputFocus && styles.inputFocused]}
          placeholder="I am passionate about..."
          value={userInfo}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={maxLength}
        />

        <Button
          title="Continue"
          onPress={() => onNext(userInfo)}
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width="100%"
          height={55}
          disabled={isButtonDisabled}
        />
      </View>
      <View style={styles.petalsContainer}>
                          <View style={styles.singlePetal}>
                            <Petal1 style={styles.petal1} />
                          </View>
                          <View style={styles.doublePetals}>
                            <Petal2 style={styles.petal2} />
                            <Petal3 style={styles.petal3} />
                </View>
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
    flex: 1,
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
    height: 150,
    borderColor: '#525853',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    marginVertical: 35,
    textAlignVertical: 'top',
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

export default Step8;
