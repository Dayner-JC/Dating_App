import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
} from 'react-native';
import IconButton from '../../components/icon_button';
import Button from '../../components/button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import ArrowRightIcon from '../../../assets/icons/arrow-right.svg';
import LockIcon from '../../../assets/icons/key.svg';
import PrivacyIcon from '../../../assets/icons/security-user.svg';
import EmailIcon from '../../../assets/icons/sms.svg';
import PhoneIcon from '../../../assets/icons/phone-2.svg';
import SecurityIcon from '../../../assets/icons/security.svg';
import CloseIcon from '../../../assets/icons/close.svg';
import {useNavigation} from '@react-navigation/native';
import DeleteIcon1 from '../../../assets/icons/trash-white.svg';
import auth from '@react-native-firebase/auth';

const MenuItem = ({icon: Icon, text, onPress}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon style={styles.menuIcon} />
    <Text style={styles.menuText}>{text}</Text>
    <ArrowRightIcon style={styles.arrowIcon} />
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteUser = async () => {
    const uid = auth().currentUser?.uid;

    if (!uid) {
      console.error('No authenticated user found.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/user/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        console.log('User deleted successfully');

        await auth().signOut();

        navigation.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
        });
      } else {
        console.error(result.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error during user deletion:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>

      <Text style={styles.title}>Settings</Text>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.dialogBox}>
            <View style={styles.dialogBar}>
              <CloseIcon onPress={() => setModalVisible(false)} />
            </View>
            <DeleteIcon1 />
            <Text style={styles.modal_title}>Delete account</Text>
            <Text style={styles.message}>
            Are you sure you want to permanently delete your account and all associated data?
            </Text>
            <Button
              title={'Yes, I’m sure'}
              fontFamily="Roboto_500"
              backgroundColor="#C3313C"
              fontSize={14}
              height={48}
              width={302}
              borderRadius={100}
              onPress={handleDeleteUser}
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

      <MenuItem
        icon={PrivacyIcon}
        text="Privacy Management"
        onPress={() => navigation.navigate('PrivacyManagementScreen')}
      />
      <MenuItem
        icon={SecurityIcon}
        text="Second Authentication Factor"
        onPress={() => navigation.navigate('TwoFAEnableScreen')}
      />
      <MenuItem
        icon={LockIcon}
        text="Change Password"
        onPress={() => navigation.navigate('ChangePasswordScreen')}
      />
      <MenuItem icon={EmailIcon} text="Change Email" onPress={() => {}} />
      <MenuItem
        icon={PhoneIcon}
        text="Change Phone Number"
        onPress={() => {}}
      />

      <TouchableOpacity
        style={styles.deleteButton} onPress={() => setModalVisible(true)}
      >
        <DeleteIcon1 />
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
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
    marginBottom: 40,
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
  deleteButton: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    paddingStart: 20,
  },
  deleteText: {
    fontFamily: 'Roboto_400',
    fontSize: 16,
    color: '#FF626E',
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
  modal_title: {
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

export default SettingsScreen;
