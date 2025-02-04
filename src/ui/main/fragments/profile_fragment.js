import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import LogoutIcon from '../../../assets/icons/logout.svg';
import CloseIcon from '../../../assets/icons/close.svg';
import Button from '../../components/button';
import auth from '@react-native-firebase/auth';
import EditImgIcon from '../../../assets/icons/edit_image_profile.svg';
import ViewProfileIcon from '../../../assets/icons/view_profile.svg';
import SettingsIcon from '../../../assets/icons/settings.svg';
import HelpCenterIcon from '../../../assets/icons/help.svg';
import PrivacyPolicyIcon from '../../../assets/icons/note.svg';
import ArrowRightIcon from '../../../assets/icons/arrow-right.svg';
import LogoutIcon2 from '../../../assets/icons/logout-2.svg';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../../config/config';

const MenuItem = ({ icon: Icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon style={styles.menuIcon} />
    <Text style={styles.menuText}>{text}</Text>
    <ArrowRightIcon style={styles.arrowIcon} />
  </TouchableOpacity>
);

export default function ProfileFragment() {
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const navigation = useNavigation();

  const fetchProfilePhotoAndName = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        console.error('No authenticated user found');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/profile/photos/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.uid }),
      });

      const photo = await response.json();
      if (photo.success && photo.images.length > 0) {
        setProfilePhoto(photo.images[0]);
      }

      const responseName = await fetch(`${API_BASE_URL}/profile/get-name`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.uid }),
      });

      const dataName = await responseName.json();

      if (dataName.success) {
        setProfileName(dataName.name);
      }

    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfilePhotoAndName();
  }, []);

  const handleLogout = async () => {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        console.error('No authenticated user found');
        return;
      }

    await auth().signOut();
    navigation.reset({
        index: 0,
        routes: [{ name: 'SplashScreen' }],
      });

    } catch (error) {
      Alert.alert('Error', 'Unable to log out');
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Account</Text>
      <View style={styles.profileContainer}>
        <View style={styles.photoWrapper}>
          <Image
            source={{ uri: profilePhoto }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton} onPress={() => {}}>
            <EditImgIcon />
          </TouchableOpacity>
        </View>
        <Text style={styles.greeting}>
          Hi, <Text style={styles.boldText}>{`${profileName}`}</Text>
        </Text>
      </View>

      <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.dialogBox}>
              <View style={styles.dialogBar}>
                <CloseIcon onPress={() => setModalVisible(false)} />
              </View>
              <LogoutIcon />
              <Text style={styles.title}>Log out</Text>
              <Text style={styles.message}>Are you sure you want to log out?</Text>
              <Button
                title={'Yes, I’m sure'}
                fontFamily="Roboto_500"
                backgroundColor="#C3313C"
                fontSize={14}
                height={48}
                width={302}
                borderRadius={100}
                onPress={handleLogout}
              />
              <Button
                title={'No, cancel'}
                fontFamily="Roboto_400"
                backgroundColor="#17261E"
                borderWidth={1}
                borderColor="#747474"
                marginTop={12}
                fontSize={14}
                height={48}
                width={302}
                borderRadius={100}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

      <MenuItem icon={ViewProfileIcon} text="View Profile" onPress={() => navigation.navigate('AccountScreen')} />
      <MenuItem icon={SettingsIcon} text="Settings" onPress={() => navigation.navigate('SettingsScreen')} />
      <MenuItem icon={HelpCenterIcon} text="Help Center" onPress={() => navigation.navigate('HelpCenterScreen')} />
      <MenuItem icon={PrivacyPolicyIcon} text="Privacy Policy" onPress={() => navigation.navigate('PrivacyPolicyScreen')} />

      <TouchableOpacity style={styles.logoutButton} onPress={() => setModalVisible(true)}>
        <LogoutIcon2/>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  header: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 32,
    color: '#D9D2B0',
    paddingStart: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 35,
  },
  photoWrapper: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 150,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  greeting: {
    fontFamily: 'Roboto_400',
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
  },
  boldText: {
    fontFamily: 'Roboto_700',
    fontSize: 20,
    color: '#FFFFFF',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222322',
    height: 60,
    padding: 20,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontFamily: 'Roboto_600',
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  arrowIcon: {
    marginLeft: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    paddingStart: 20,
  },
  logoutText: {
    fontFamily: 'Roboto_400',
    fontSize: 16,
    color: '#979797',
    paddingStart: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0F0DE5',
  },
  dialogBox: {
    width: 350,
    height: 326,
    backgroundColor: '#17261E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#21362C',
  },
  dialogBar: {
    height: 36,
    alignItems: 'flex-end',
    backgroundColor: '#17261F',
    width: '100%',
    paddingStart: 10,
  },
  title: {
    fontFamily: 'Roboto_600',
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 10,
    marginTop: 5,
  },
  message: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
});
