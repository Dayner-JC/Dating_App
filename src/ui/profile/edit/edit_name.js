import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';

const EditName = ({ route }) => {
  const navigation = useNavigation();
  const { uid } = route.params;
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const validateName = useCallback((input) => {
    const regex = /^[A-Z][a-zA-Z]{2,}$/;
    return regex.test(input.trim());
  }, []);

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
      } catch (error) {
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
      <View style={styles.content}>
        <Text style={styles.title}>Edit Name</Text>
        <Text style={styles.subtitle}>What's your name?</Text>

        <View style={styles.input_container}>
          <Text style={styles.yourName_text}>Your name</Text>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholder="Max"
            value={name}
            onChangeText={setName}
            placeholderTextColor={'#D9D2B080'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
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
    height: '56',
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

export default EditName;
