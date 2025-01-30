import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';

const EditAbout = ({route}) => {
  const navigation = useNavigation();
  const {uid} = route.params;
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

    const handleSaveChanges = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/profile/edit/edit-about`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: uid,
              about: userInfo,
            }),
          });

          const data = await response.json();

          if (data.success) {
            navigation.goBack();
          } else {
            Alert.alert(data.error || 'Error updating info.');
          }
        } catch (error) {
          console.error('Error updating info:', error);
          Alert.alert('Failed to update info.');
        }
    };

  const isButtonDisabled = userInfo.length < minLength || userInfo.length > maxLength;

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
         <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Your Story</Text>
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
          title="Save changes"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width="100%"
          height={55}
          onPress={handleSaveChanges}
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
          onPress={() => {}}
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
    backgroundColor: '#17261F',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#17261F',
    width: '100%',
    paddingStart: 10,
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
    height: 300,
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

export default EditAbout;
