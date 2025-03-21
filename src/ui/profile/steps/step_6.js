import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../../components/button';

const Step6 = ({ onNext, onChangeData }) => {
  const [selectedIntentions, setSelectedIntentions] = useState(null);

  const intentions = [
    { id: 'serious_relationship', label: 'Serious Relationship' },
    { id: 'casual_dating', label: 'Casual Dating' },
    { id: 'friendship/activity_partner', label: 'Friendship / Activity Partner' },
    { id: 'open_relationship', label: 'Open Relationship' },
    { id: 'networking', label: 'Networking' },
  ];

  const handleIntentionsSelect = (id) => {
    setSelectedIntentions(id);
    onChangeData('intentions', id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Intentions</Text>
        <Text style={styles.subtitle}>What is your dating intention?</Text>
    <View style={styles.option_container}>
        {intentions.map((intention) => (
          <TouchableOpacity
            key={intention.id}
            style={[
              styles.intentionsOption,
              selectedIntentions === intention.id && styles.selectedOption,
            ]}
            onPress={() => handleIntentionsSelect(intention.id)}
          >
            <Text
              style={[
                styles.intentionsText,
                selectedIntentions === intention.id && styles.selectedText,
              ]}
            >
              {intention.label}
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
          disabled={!selectedIntentions}
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
  intentionsOption: {
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
  intentionsText: {
    color: '#D9D2B0',
    fontSize: 16,
    fontFamily: 'Roboto_400',
    textAlign: 'center',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default Step6;
