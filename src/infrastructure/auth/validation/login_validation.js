import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import appleAuth from '@invertase/react-native-apple-authentication';
import axios from 'axios';

const BASE_URL = 'https://api.com/auth';

export const validatePhoneLogin = async (phoneNumber, verificationCode) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    const userCredential = await confirmation.confirm(verificationCode);
    const firebaseIdToken = await userCredential.user.getIdToken();

    const response = await axios.post(`${BASE_URL}/login`, {
      idToken: firebaseIdToken,
      method: 'phone',
    });

    return response.data;
  } catch (error) {
    console.error('Error during phone login:', error);
    throw error;
  }
};

export const validateGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    const firebaseIdToken = await userCredential.user.getIdToken();

    const response = await axios.post(`${BASE_URL}/login`, {
      idToken: firebaseIdToken,
      method: 'google',
    });

    return response.data;
  } catch (error) {
    console.error('Error during Google login:', error);
    throw error;
  }
};

export const validateFacebookLogin = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    const userCredential = await auth().signInWithCredential(facebookCredential);
    const firebaseIdToken = await userCredential.user.getIdToken();

    const response = await axios.post(`${BASE_URL}/login`, {
      idToken: firebaseIdToken,
      method: 'facebook',
    });

    return response.data;
  } catch (error) {
    console.error('Error during Facebook login:', error);
    throw error;
  }
};

export const validateAppleLogin = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const { identityToken, nonce } = appleAuthRequestResponse;
    if (!identityToken) {
      throw 'Apple Sign-In failed - no identity token returned';
    }

    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    const userCredential = await auth().signInWithCredential(appleCredential);
    const firebaseIdToken = await userCredential.user.getIdToken();

    const response = await axios.post(`${BASE_URL}/login`, {
      idToken: firebaseIdToken,
      method: 'apple',
    });

    return response.data;
  } catch (error) {
    console.error('Error during Apple login:', error);
    throw error;
  }
};
