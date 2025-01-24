import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';
import { useNavigation } from '@react-navigation/native';

const EditIntentions = ({route}) => {
  const navigation = useNavigation();
  const { uid } = route.params;
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
  };

    const handleSaveChanges = async () => {
        try {
          const response = await fetch('http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/profile/edit/edit-intentions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: uid,
              intentions: selectedIntentions,
            }),
          });

          const data = await response.json();

          if (data.success) {
            navigation.goBack();
          } else {
            Alert.alert(data.error || 'Error updating intentions.');
          }
        } catch (error) {
          console.error('Error updating intentions:', error);
          Alert.alert('Failed to update intentions.');
        }
    };

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
         <IconButton icon={<ArrowIcon />} onPress={()=>navigation.goBack()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Intentions</Text>
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
          disabled={!selectedIntentions}
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

export default EditIntentions;
