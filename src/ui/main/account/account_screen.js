import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import InputIcon from '../../../assets/icons/input.svg';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';
import { getCurrentUserUID } from '../../../infrastructure/uid/uid';

const AccountScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const uid = getCurrentUserUID();
  const [images, setImages] = useState([]);

  const fetchUserData = useCallback(async () => {
    try {
      const userResponse = await fetch(
        `${API_BASE_URL}/profile/request-data`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uid }),
        },
      );
      const data = await userResponse.json();
      setUserData(data);

      const imagesResponse = await fetch(
        `${API_BASE_URL}/profile/photos/get`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uid }),
        },
      );
      const imagesData = await imagesResponse.json();
      if (imagesData.success) {
        setImages(imagesData.images);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [fetchUserData]),
  );

  const calculateAge = birthday => {
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
        <StatusBar backgroundColor="#0A0F0D" />
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.navigate('Main')} />
      </View>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.sectionTitle}>Photos</Text>
      <View style={styles.photoGrid}>
        {[...Array(6)].map((_, index) => {
          const photo = images[index];
          return (
            <View key={index} style={styles.photoWrapper}>
              <View
                style={[
                  styles.photoContainer,
                  photo ? styles.solidBorder : styles.dashedBorder,
                ]}>
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.photo} />
                ) : (
                  <View style={styles.placeholder}>
                    <InputIcon width={'100%'} height={'100%'} />
                  </View>
                )}
                {index === 0 && photo && (
                  <View style={styles.mainLabel}>
                    <Text style={styles.mainLabelText}>Main</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity>
        <Text
          style={styles.editButton}
          onPress={() => navigation.navigate('EditPhotos', {uid: uid})}>
          Edit photos
        </Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.profileContainer}
        showsVerticalScrollIndicator={false}>
        <ProfileItem
          label="Your Name"
          value={userData?.name || 'N/A'}
          onEdit={() => navigation.navigate('EditName', {uid: uid})}
        />
        <ProfileItem
          label="Personal description"
          value={userData?.description || 'N/A'}
          onEdit={() => navigation.navigate('EditAbout', {uid: uid})}
        />
        <ProfileItem
          label="Interests and hobbies"
          value={userData.interests ? userData.interests.join(', ') : 'N/A'}
          onEdit={() => navigation.navigate('EditInterests', {uid: uid})}
        />
        <ProfileItem
          label="Location"
          value={
            userData?.location
              ? `${userData.location.country}, ${userData.location.state}`
              : 'N/A'
          }
          onEdit={() => navigation.navigate('EditLocation', {uid: uid})}
        />
        <ProfileItem
          label="Age"
          value={userData?.birthday ? calculateAge(userData.birthday) : 'N/A'}
          onEdit={() => navigation.navigate('EditBirthday', {uid: uid})}
        />
        <ProfileItem
          label="Height"
          value={userData?.height?.toString() || 'N/A'}
          onEdit={() => navigation.navigate('EditHeight', {uid: uid})}
        />
        <ProfileItem
          label="Gender"
          value={userData?.gender || 'N/A'}
          onEdit={() => navigation.navigate('EditGender', {uid: uid})}
        />
        <ProfileItem
          label="Preference"
          value={userData?.preference || 'N/A'}
          onEdit={() => navigation.navigate('EditPreferences', {uid: uid, from: 'AccountScreen'})}
        />
        <ProfileItem
          label="Intentions"
          value={userData?.intentions || 'N/A'}
          onEdit={() => navigation.navigate('EditIntentions', {uid: uid})}
        />
      </ScrollView>
    </View>
  );
};

const ProfileItem = ({label, value, onEdit}) => (
  <View style={styles.profileItem}>
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} ellipsizeMode="tail">
        {value || 'N/A'}
      </Text>
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
    marginHorizontal: 20,
  },
  photoWrapper: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 20,
    position: 'relative',
  },
  photoContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashedBorder: {
    borderWidth: 1,
    borderColor: '#525853',
    borderStyle: 'dashed',
  },
  solidBorder: {
    borderWidth: 1,
    borderColor: '#525853',
    borderStyle: 'solid',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5258531A',
  },
  mainLabel: {
    width: 60,
    position: 'absolute',
    bottom: 5,
    left: '50%',
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
