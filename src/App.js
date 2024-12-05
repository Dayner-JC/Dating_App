import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Navigator from './ui/navigation/navigator';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'WEB_CLIENT_ID',
    });
  }, []);

  return <Navigator />;
};

export default App;
