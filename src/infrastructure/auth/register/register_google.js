import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

/**
 * @param {Function} navigation
 */
export const registerWithGoogle = async (navigation) => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const signInResult = await GoogleSignin.signIn();

    let idToken = signInResult.data?.idToken;

    if (!idToken) {
      idToken = signInResult.idToken;
    }

    if (!idToken) {
      throw new Error('Failed to obtain token ID');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const userCredential = await auth().signInWithCredential(googleCredential);

    const { uid, email } = userCredential.user;

    const response = await fetch('http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/register/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, email }),
    });

    if (!response.ok) {
      throw new Error('Error registering user in the backend.');
    }

    navigation.navigate('CompleteProfile');
  } catch (error) {
    Alert.alert('Error', error);
  }
};
