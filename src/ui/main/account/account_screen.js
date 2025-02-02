import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';

const AccountScreen = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        setUserId(user.uid);
        try {
          const response = await fetch(`${API_BASE_URL}/profile/request-data`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.uid }),
          });
          const data = await response.json();
          setUserData(data);
          console.log('Data: ', data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const calculateAge = (birthday) => {
    if (!birthday) {
      return 'N/A';
    }

    const [month, day, year] = birthday.split('/');
    const birthDate = new Date(`${year}`, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age.toString();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D9D2B0" />
      </View>
    );
  }

  const images = [
    require('../../../assets/user_1.jpg'),
    require('../../../assets/2.png'),
    require('../../../assets/3.png'),
    require('../../../assets/1.png'),
    require('../../../assets/5.png'),
    require('../../../assets/6.png'),
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
         <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.sectionTitle}>Photos</Text>
      <View style={styles.photoGrid}>
        {images.map((img, index) => (
          <View key={index} style={styles.photoContainer}>
            <Image source={img} style={styles.photo} />
            {index === 0 && (
              <View style={styles.mainLabel}>
                <Text style={styles.mainLabelText}>Main</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity>
        <Text style={styles.editButton} onPress={() => navigation.navigate('EditPhotos', { uid: userId })}>Edit photos</Text>
      </TouchableOpacity>

      <ScrollView style={styles.profileContainer} showsVerticalScrollIndicator={false}>
        <ProfileItem
          label="Your Name"
          value={userData?.name || 'N/A'}
          onEdit={() => navigation.navigate('EditName', { uid: userId })}
        />
        <ProfileItem
          label="Personal description"
          value={userData?.description || 'N/A'}
          onEdit={() => navigation.navigate('EditAbout', { uid: userId })}
        />
        <ProfileItem
          label="Interests and hobbies"
          value={userData.interests ? userData.interests.join(', ') : 'N/A'}
          onEdit={() => navigation.navigate('EditInterests', { uid: userId })}
        />
        <ProfileItem
          label="Location"
          value={userData?.location ? `${userData.location.country}, ${userData.location.state}` : 'N/A'}
          onEdit={() => navigation.navigate('EditLocation', { uid: userId })}
        />
        <ProfileItem
          label="Age"
          value={userData?.birthday ? calculateAge(userData.birthday) : 'N/A'}
          onEdit={() => navigation.navigate('EditBirthday', { uid: userId })}
        />
        <ProfileItem
          label="Height"
          value={userData?.height?.toString() || 'N/A'}
          onEdit={() => navigation.navigate('EditHeight', { uid: userId })}
        />
        <ProfileItem
          label="Gender"
          value={userData?.gender || 'N/A'}
          onEdit={() => navigation.navigate('EditGender', { uid: userId })}
        />
        <ProfileItem
          label="Preference"
          value={userData?.preference || 'N/A'}
          onEdit={() => navigation.navigate('EditPreferences', { uid: userId })}
        />
        <ProfileItem
          label="Intentions"
          value={userData?.intentions || 'N/A'}
          onEdit={() => navigation.navigate('EditIntentions', { uid: userId })}
        />
      </ScrollView>
    </View>
  );
};

const ProfileItem = ({ label, value, onEdit }) => (
  <View style={styles.profileItem}>
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} ellipsizeMode="tail">{value || 'N/A'}</Text>
    </View>
    <TouchableOpacity onPress={onEdit}>
      <Text style={styles.editText}>Edit</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0F0D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#0A0F0D',
    width: '100%',
    paddingStart: 10,
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 32,
    color: '#D9D2B0',
    paddingStart: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontFamily: 'Roboto_600',
    fontSize: 12,
    color: '#D9D2B0',
    marginBottom: 5,
    marginStart: 20,
    paddingTop: 30,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#525853',
  },
  photoContainer: {
    position: 'relative',
  },
  mainLabel: {
    width: 60,
    position: 'absolute',
    bottom: 15,
    left: '50',
    transform: [{ translateX: -30 }],
    backgroundColor: '#D9D2B0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  mainLabelText: {
    fontFamily: 'roboto_400',
    color: '#17261F',
    fontSize: 12,
    textAlign: 'center',
  },
  editButton: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    alignSelf: 'flex-end',
    paddingEnd: 20,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  profileContainer: {
    flex: 1,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#222322',
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    marginStart: 20,
  },
  label: {
    color: '#D9D2B0',
    fontFamily: 'Roboto_600',
    fontSize: 12,
  },
  value: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 2,
  },
  editText: {
    color: '#D9D2B0',
    fontFamily: 'Roboto_400',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginRight: 20,
  },
});

export default AccountScreen;
