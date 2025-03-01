import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../../components/button';

const Step3 = ({ onNext, onChangeData }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const genders = [
    { id: 'man', label: 'Man' },
    { id: 'woman', label: 'Woman' },
    { id: 'nonbinary', label: 'Nonbinary' },
  ];

  const handleGenderSelect = (id) => {
    setSelectedGender(id);
    onChangeData('gender', id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Gender</Text>
        <Text style={styles.subtitle}>Which gender best describes you?</Text>
      <View style={styles.option_container}>
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender.id}
            style={[
              styles.genderOption,
              selectedGender === gender.id && styles.selectedOption,
            ]}
            onPress={() => handleGenderSelect(gender.id)}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === gender.id && styles.selectedText,
              ]}
            >
              {gender.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
          onPress={onNext}
          disabled={!selectedGender}
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
  genderOption: {
    backgroundColor: '#5258531A',
    borderColor: '#525853',
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 15,
    height: 56,
  },
  selectedOption: {
    backgroundColor: '#3A341B',
    borderColor: '#D97904',
  },
  genderText: {
    color: '#D9D2B0',
    fontSize: 16,
    fontFamily: 'Roboto_400',
    textAlign: 'center',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default Step3;
