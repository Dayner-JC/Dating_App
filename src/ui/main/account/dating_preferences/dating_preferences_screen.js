/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../../../config/config';

const DatingPreferencesScreen = () => {
  const navigation = useNavigation();
  const [maxDistance, setMaxDistance] = useState(5);
  const [ageRange, setAgeRange] = useState([18, 30]);
  const [preference, setPreference] = useState('Women');
  const [loading, setLoading] = useState(true);
  const [photoRangeIndex, setPhotoRangeIndex] = useState([2, 6]);

  const currentUser = auth().currentUser;
  const uid = currentUser?.uid;

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile/dating_preferences/get`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
          throw new Error('Error fetching preferences');
        }

        const data = await response.json();
        const { datingPreferences, preference } = data;

        setMaxDistance(datingPreferences.maxDistance);
        setAgeRange(datingPreferences.ageRange);
        setPhotoRangeIndex(datingPreferences.photoRangeIndex);
        setPreference(preference);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchPreferences();
    }
  }, [uid]);

  const handleBackPress = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/dating_preferences/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid,
          datingPreferences: {
            maxDistance,
            ageRange,
            photoRangeIndex,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Error updating preferences');
      }

    } catch (error) {
      Alert.alert('Failed to save preferences.');
    } finally {
      navigation.navigate('Main');
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
      <StatusBar backgroundColor="#0A0F0D" />
      <TouchableOpacity style={styles.appBar} onPress={handleBackPress}>
        <Text style={styles.closeButton}>×</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Dating Preferences</Text>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Show Me</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditPreferences',{uid: uid, from: 'DatingPreferencesScreen'})}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.lookingForText}>{preference}</Text>
        <View style={styles.divisor} />

        <View style={styles.row}>
          <Text style={styles.label}>Maximum Distance</Text>
          <Text style={styles.valueText}>
            {maxDistance == 100 ? '100+ km' : `${maxDistance} km`}
          </Text>
        </View>
        <Slider
          value={maxDistance}
          minimumValue={5}
          maximumValue={100}
          step={1}
          onValueChange={(value) => setMaxDistance(value)}
          minimumTrackTintColor="#ff9800"
          maximumTrackTintColor="#222322"
          thumbTintColor="#ff9800"
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
          containerStyle={styles.sliderContainer}
        />
        <Text style={styles.foot_text}>
          *Maximum distance to people you want to meet.
        </Text>
        <View style={styles.divisor} />

        <View style={styles.row}>
          <Text style={styles.label}>Age Range</Text>
          <Text style={styles.valueText}>
            {ageRange[0]} - {ageRange[1] == 60 ? '60+' : ageRange[1]}
          </Text>
        </View>
        <Slider
          value={ageRange}
          minimumValue={18}
          maximumValue={60}
          step={1}
          onValueChange={(value) => setAgeRange(value)}
          minimumTrackTintColor="#ff9800"
          maximumTrackTintColor="#222322"
          thumbTintColor="#ff9800"
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
          containerStyle={styles.sliderContainer}
        />
        <Text style={styles.foot_text}>
          *Age range of the people you are interested in meeting.
        </Text>
        <View style={styles.divisor} />

        <View style={styles.row}>
          <Text style={styles.label}>Min. Number of Photos</Text>
          <Text style={styles.valueText}>
            {photoRangeIndex[0]}-{photoRangeIndex[1]} photos
          </Text>
        </View>
        <Slider
          value={photoRangeIndex}
          minimumValue={2}
          maximumValue={6}
          step={1}
          onValueChange={(value) => setPhotoRangeIndex(value)}
          minimumTrackTintColor="#ff9800"
          maximumTrackTintColor="#222322"
          thumbTintColor="#ff9800"
          trackStyle={styles.trackStyle}
          thumbStyle={styles.thumbStyle}
          containerStyle={styles.sliderContainer}
        />
        <Text style={styles.foot_text}>*Number of photos in the profile.</Text>
        <View style={styles.divisor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17261F',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#0A0F0D',
    width: '100%',
    paddingStart: 20,
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 32,
    color: '#D9D2B0',
    marginTop: 20,
    marginBottom: 40,
    marginStart: 20,
  },
  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#222322',
    marginTop: 15,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 32,
    color: '#fff',
  },
  content: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  label: {
    fontFamily: 'Roboto_500',
    fontSize: 12,
    color: '#D9D2B0',
  },
  editText: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    textDecorationLine: 'underline',
  },
  lookingForText: {
    fontFamily: 'Roboto_400',
    fontSize: 16,
    color: '#FFFFFF',
    marginStart: 20,
  },
  valueText: {
    fontFamily: 'Roboto_400',
    fontSize: 16,
    color: '#FFFFFF',
  },
  sliderContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  trackStyle: {
    height: 8,
    borderRadius: 4,
  },
  thumbStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff9800',
  },
  foot_text: {
    fontFamily: 'Roboto_300',
    fontSize: 12,
    color: '#FFFFFF',
    marginStart: 20,
    fontStyle: 'italic',
  },
});

export default DatingPreferencesScreen;
