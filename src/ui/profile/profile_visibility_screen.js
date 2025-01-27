import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import Button from '../components/button';
import IconButton from '../components/icon_button';
import ArrowIcon from '../../assets/icons/arrow-left.svg';
import Petal1 from '../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../assets/splash_screen_flower/petals/petal_10.svg';
import { useNavigation } from '@react-navigation/native';

const ProfileVisibilityScreen = (/*{route}*/) => {
  const navigation = useNavigation();
  //const { uid } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 'all', label: 'Visible to all users' },
    { id: 'matches', label: 'Visible only to matches' },
    { id: 'hide', label: 'Hide profile temporarily' },
  ];

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };

    const handleSaveChanges = async () => {
        // try {
        //   const response = await fetch('http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/profile/edit/edit-visibility', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       userId: uid,
        //       gender: selectedGender,
        //     }),
        //   });

        //   const data = await response.json();

        //   if (data.success) {
        //     navigation.goBack();
        //   } else {
        //     Alert.alert(data.error || 'Error updating visibility.');
        //   }
        // } catch (error) {
        //   console.error('Error updating visibility:', error);
        //   Alert.alert('Failed to update visibility.');
        // }
    };

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
         <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Profile{'\n'}Visibility</Text>
        <Text style={styles.subtitle}>Who can see your profile?</Text>
      <View style={styles.option_container}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedOption === option.id && styles.selectedOption,
            ]}
            onPress={() => handleOptionSelect(option.id)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === option.id && styles.selectedText,
              ]}
            >
              {option.label}
            </Text>
            <View style={[styles.circle, selectedOption === option.id && styles.selectedCircle]} />
          </TouchableOpacity>
        ))}
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
          disabled={!selectedOption}
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
  option_container: {
    marginVertical: 35,
  },
  option: {
    flexDirection: 'row',
    backgroundColor: '#5258531A',
    borderColor: '#525853',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    height: 56,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  selectedOption: {
    backgroundColor: '#3A341B',
    borderColor: '#D97904',
  },
  optionText: {
    color: '#D9D2B0',
    fontSize: 16,
    fontFamily: 'Roboto_400',
    textAlign: 'left',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#DADADA',
    borderRadius: 10,
  },
  selectedCircle: {
    borderWidth: 3.5,
    backgroundColor: '#FFFFFF',
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

export default ProfileVisibilityScreen;
