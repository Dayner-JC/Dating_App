import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
} from 'react-native';
import IconButton from '../../../components/icon_button';
import ArrowIcon from '../../../../assets/icons/arrow-left.svg';
import HideIcon from '../../../../assets/icons/hide.svg';
import ShowIcon from '../../../../assets/icons/show.svg';
import Petal1 from '../../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../../assets/splash_screen_flower/petals/petal_10.svg';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Button from '../../../components/button';
import API_BASE_URL from '../../../../config/config';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const user = auth().currentUser;
  const email = user.email;

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
      password,
    );

  const handlePasswordToggle = () => setShowPassword(prev => !prev);

  const verifyCurrentPassword = async () => {

    if (!user || !user.email) {
      Alert.alert('Error', 'Your section login has expired please log back in.');
      return;
    }

    try {
      const credential = auth.EmailAuthProvider.credential(email, password);
      await user.reauthenticateWithCredential(credential);

      navigation.navigate('NewPasswordScreen', { email });
    } catch (error) {
      Alert.alert('Error', 'The current password is incorrect.');
    }
  };

  const requestPasswordReset = async () => {
    try {

      if (!user || !email) {
        Alert.alert('Error', 'Your section login has expired please log back in.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/login/password-reset/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'The code was sent to your email.');
        navigation.navigate('VerifyCodeEmailScreen', { uid: data.uid, email: email });
      } else {
        Alert.alert('Error', 'Could not send code.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Change your{'\n'}Password</Text>
        <Text style={styles.subtitle_text}>Introduce your current password.</Text>

        <View style={styles.input_container}>
          <Text style={styles.password_text}>Current Password</Text>
          <View
            style={[
              styles.password_input_container,
              isFocused ? styles.focused_border : styles.default_border,
            ]}>
            <TextInput
              style={styles.input}
              placeholder="********"
              placeholderTextColor="#D9D2B03D"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {password.length > 0 && (
              <TouchableOpacity
                style={styles.toggle_password_visibility}
                onPress={handlePasswordToggle}>
                {showPassword ? (
                  <HideIcon width={20} height={20} />
                ) : (
                  <ShowIcon width={20} height={20} />
                )}
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.forgot_container}>
            <Text style={styles.forgot_text} onPress={requestPasswordReset}>
              Forgot your password?
            </Text>
          </View>
        </View>
        <Button
          title={'Continue'}
          fontFamily="Roboto_500"
          fontSize={16}
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          height={55}
          marginTop={20}
          disabled={!isPasswordValid}
          onPress={verifyCurrentPassword}
        />
        <Button
          title={'Cancel'}
          fontFamily="Roboto_500"
          fontSize={16}
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="#747474"
          borderRadius={100}
          height={55}
          marginTop={20}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.petalsContainer}>
        <View style={styles.singlePetal}>
          <Petal1 style={styles.petal1} />
        </View>
        <View style={styles.doublePetals}>
          <Petal2 style={styles.petal2} />
          <Petal3 style={styles.petal3} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17261F',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
  content: {
    width: '85%',
    alignItems: 'flex-start',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#17261F',
    width: '100%',
    paddingStart: 10,
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    color: '#D9D2B0',
    fontSize: 40,
    letterSpacing: 1,
    paddingTop: 20,
  },
  subtitle_text: {
    fontFamily: 'Roboto_400',
    color: '#D9D2B0',
    fontSize: 14,
    marginBottom: 35,
  },
  password_text: {
    fontFamily: 'Roboto_500',
    color: '#D9D2B0',
    fontSize: 12,
    marginBottom: 5,
  },
  password_input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    height: 60,
    paddingHorizontal: 16,
  },
  input_container: {
    width: '100%',
    marginBottom: 5,
  },
  default_border: {
    borderColor: '#D9D2B0',
  },
  focused_border: {
    borderColor: '#D97904',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  forgot_container: {
    width: '100%',
    alignItems: 'flex-end',
  },
  forgot_text: {
    fontFamily: 'Roboto_500',
    color: '#D97904',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  petalsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  singlePetal: {
    flex: 1,
  },
  doublePetals: {
    flex: 1,
    flexDirection: 'row',
  },
  petal1: {
    marginStart: 10,
    marginBottom: 60,
  },
  petal2: {
    marginTop: 60,
  },
  petal3: {
    marginLeft: 60,
    marginTop: 20,
  },
});

export default ChangePasswordScreen;
