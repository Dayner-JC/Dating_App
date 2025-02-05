import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Navigator from './ui/navigation/navigator';

LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components',
]);

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '150950766105-q2q6itt87b287breoo87q06hj54djb66.apps.googleusercontent.com',
    });
  }, []);
  return <Navigator />;
};

export default App;
