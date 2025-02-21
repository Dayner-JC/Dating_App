import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import VerifyCodeAppBar from '../../appBars/verify_code_appBar';
import Button from '../../../components/button';
import HideIcon from '../../../../assets/icons/hide.svg';
import ShowIcon from '../../../../assets/icons/show.svg';
import {useNavigation} from '@react-navigation/native';
import Petal1 from '../../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../../assets/splash_screen_flower/petals/petal_10.svg';
import API_BASE_URL from '../../../../config/config';
import auth from '@react-native-firebase/auth';

const NewPasswordScreen = ({route}) => {
  const {email} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const user = auth().currentUser;
  const [isFocused, setIsFocused] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigation = useNavigation();

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
      password,
    );
  const passwordsMatch = password === confirmPassword;

  const isButtonEnabled = isPasswordValid && passwordsMatch;

  const updatePassword = async () => {
    try {

      if (!user || !email) {
        Alert.alert('Error', 'Your section login has expired please log back in.');
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/auth/login/password-reset/new-password`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, password}),
        },
      );

      if (response.ok) {
        await user.updatePassword(password);
        Alert.alert('Success', 'Updated password!');
        navigation.navigate('LoginEmailScreen');
      }else{
        Alert.alert('Error', 'Please log back in');
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
        <VerifyCodeAppBar />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>New password</Text>
        <Text style={styles.subtitle}>Introduce your new password.</Text>
        <View style={styles.section_input_container}>
          <View style={styles.input_container}>
            <Text style={styles.label}>New password</Text>
            <View
              style={[
                styles.input_wrapper,
                isFocused.password
                  ? styles.focused_border
                  : styles.default_border,
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Create your new password"
                placeholderTextColor="#D9D2B080"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() =>
                  setIsFocused(prev => ({...prev, password: true}))
                }
                onBlur={() =>
                  setIsFocused(prev => ({...prev, password: false}))
                }
              />
              {password.length > 0 && (
                <TouchableOpacity
                  onPress={() => setShowPassword(prev => !prev)}>
                  {showPassword ? (
                    <HideIcon width={20} height={20} />
                  ) : (
                    <ShowIcon width={20} height={20} />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.input_container}>
            <Text style={styles.label}>Confirm password</Text>
            <View
              style={[
                styles.input_wrapper,
                isFocused.confirmPassword
                  ? styles.focused_border
                  : styles.default_border,
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Confirm the password"
                placeholderTextColor="#D9D2B080"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() =>
                  setIsFocused(prev => ({...prev, confirmPassword: true}))
                }
                onBlur={() =>
                  setIsFocused(prev => ({...prev, confirmPassword: false}))
                }
              />
              {confirmPassword.length > 0 && (
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(prev => !prev)}>
                  {showConfirmPassword ? (
                    <HideIcon width={20} height={20} />
                  ) : (
                    <ShowIcon width={20} height={20} />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <Button
          title="Confirm"
          fontSize={16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width="100%"
          height={55}
          onPress={updatePassword}
          disabled={!isButtonEnabled}
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
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#17261F',
  },
  appBar: {
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    zIndex: 1,
  },
  content: {
    width: '85%',
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 40,
    color: '#D9D2B0',
    textAlign: 'left',
  },
  subtitle: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    textAlign: 'left',
    marginTop: 10,
  },
  section_input_container: {
    paddingVertical: 35,
  },
  input_container: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Roboto_500',
    color: '#D9D2B0',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'justify',
  },
  input_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2D24',
    borderWidth: 1,
    borderColor: '#D9D2B0',
    borderRadius: 5,
    height: 60,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 16,
  },
  focused_border: {
    borderColor: '#D97904',
  },
  default_border: {
    borderColor: '#D9D2B0',
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

export default NewPasswordScreen;
