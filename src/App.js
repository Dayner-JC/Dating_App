import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Navigator from './ui/navigation/navigator';
import ProfileCreation from './ui/profile/profile_creation_steps';
import CreateProfileScreen from './ui/profile/create_profile_screen';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '150950766105-q2q6itt87b287breoo87q06hj54djb66.apps.googleusercontent.com',
    });
  }, []);
  return <Navigator />;
};

export default App;
