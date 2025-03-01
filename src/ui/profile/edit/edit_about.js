import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';
import Background from '../../../assets/backgrounds/edits.svg';

const EditAbout = ({route}) => {
  const navigation = useNavigation();
  const {uid} = route.params;
  const [userInfo, setUserInfo] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const minLength = 10;
  const maxLength = 200;

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
          setUserInfo(data.description || '');
        } else {
          Alert.alert('Error', data.error || 'Failed to load user data.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data.');
      }
    };

    fetchUserData();
  }, [uid]);

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
      <Background style={styles.background} />
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
});

export default EditAbout;
