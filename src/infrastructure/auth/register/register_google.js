import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import API_BASE_URL from '../../../config/config';

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

    const response = await fetch(`${API_BASE_URL}/auth/register/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, email }),
    });

    if (!response.ok) {
      throw new Error('Error registering user in the backend.');
    }

    navigation.navigate('CreateProfileScreen');
  } catch (error) {
    console.log('Error', error);
  }
};
