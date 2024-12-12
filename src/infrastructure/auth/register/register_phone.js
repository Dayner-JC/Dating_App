import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

/**
 *
 * @param {string} callingCode
 * @param {string} phoneNumber
 * @returns {Promise<string>}
 */
export const handlePhoneRegister = async (callingCode, phoneNumber) => {
  if (!phoneNumber || phoneNumber.length < 8 || phoneNumber.length > 10) {
    Alert.alert('Error', 'Invalid phone number.');
    return null;
  }

  try {
    const confirmation = await auth().signInWithPhoneNumber(`${callingCode}${phoneNumber}`);
    return confirmation.verificationId;
  } catch (error) {
    Alert.alert('Error', 'Failed to send verification code.');
    return null;
  }
};
