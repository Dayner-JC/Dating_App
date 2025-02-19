import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import Button from '../components/button';
import IconButton from '../components/icon_button';
import ArrowIcon from '../../assets/icons/arrow-left.svg';
import Petal1 from '../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../assets/splash_screen_flower/petals/petal_10.svg';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../config/config';

const ProfileVisibilityScreen = ({ route }) => {
  const navigation = useNavigation();
  const { uid } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);
  const [privacySettings, setPrivacySettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = [
    { id: 'all', label: 'Visible to all users' },
    { id: 'matches', label: 'Visible only to matches' },
    { id: 'hide', label: 'Hide profile temporarily' },
  ];

  useEffect(() => {
    const fetchPrivacySettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/privacy-settings/get`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid }),
        });
        const data = await response.json();

        if (data.success) {
          const { privacySettings } = data;

          setPrivacySettings(privacySettings);

          const visibility = privacySettings.profileVisibility;
          if (visibility.Visible_to_all_users) {
            setSelectedOption('all');
          } else if (visibility.Visible_only_to_matches) {
            setSelectedOption('matches');
          } else if (visibility.Hide_profile_temporarily) {
            setSelectedOption('hide');
          }
        } else {
          console.error('Error fetching privacy settings:', data.message);
        }
      } catch (error) {
        console.error('Error fetching privacy settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacySettings();
  }, [uid]);

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };

  const handleSaveChanges = async () => {
    if (!selectedOption || !privacySettings) {return;}

    try {
      const updatedPrivacySettings = {
        ...privacySettings,
        profileVisibility: {
          Visible_to_all_users: selectedOption === 'all',
          Visible_only_to_matches: selectedOption === 'matches',
          Hide_profile_temporarily: selectedOption === 'hide',
        },
      };

      const response = await fetch(`${API_BASE_URL}/user/privacy-settings/put`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          privacySettings: updatedPrivacySettings,
        }),
      });

      const data = await response.json();
      if (data.success) {
        navigation.navigate('PrivacyManagementScreen');
      } else {
        console.error('Error updating privacy settings:', data.message);
      }
    } catch (error) {
      console.error('Error updating privacy settings:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D97904" />
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17261F',
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
