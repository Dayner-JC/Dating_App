import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import Button from '../../components/button';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';
import Background from '../../../assets/backgrounds/edits.svg';

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
          setSelectedIntentions(data.intentions || null);
        } else {
          Alert.alert('Error', data.error || 'Failed to load user data.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data.');
      }
    };

    fetchUserData();
  }, [uid]);

    const handleSaveChanges = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/profile/edit/edit-intentions`, {
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
      <Background style={styles.background} />
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

export default EditIntentions;
