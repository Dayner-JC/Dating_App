// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
// import { Alert } from 'react-native';

// export const registerWithFacebook = async (navigation) => {
//   try {
//     const result = await LoginManager.logInWithPermissions(['email', 'public_profile']);

//     if (result.isCancelled) {
//       throw new Error('User cancelled the login process');
//     }

//     const facebookData = await AccessToken.getCurrentAccessToken();
//     if (!facebookData) {
//       throw new Error('Failed to obtain access token');
//     }

//     const facebookCredential = auth.FacebookAuthProvider.credential(facebookData.accessToken);

//     const userCredential = await auth().signInWithCredential(facebookCredential);
//     const firebaseIdToken = await userCredential.user.getIdToken();

//     const email = userCredential.user.email || null;
//     const phoneNumber = userCredential.user.phoneNumber || null;

//     const backendResponse = await fetch(
//       'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/register/facebook',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           idToken: firebaseIdToken,
//           email,
//           phoneNumber,
//         }),
//       }
//     );

//     const backendData = await backendResponse.json();

//     if (backendData.success) {
//       navigation.navigate('CompleteProfile');
//     } else {
//       throw new Error('Failed to register user');
//     }
//   } catch (error) {
//     Alert.alert('Registration Failed', error.message);
//   }
// };
