import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import Button from '../../../components/button';
import IconButton from '../../../components/icon_button';
import {useNavigation} from '@react-navigation/native';
import ArrowIcon from '../../../../assets/icons/arrow-left.svg';
import Petal1 from '../../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../../assets/splash_screen_flower/petals/petal_10.svg';

const ChangeEmailScreen = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setconfirmEmail] = useState('');
  const [isFocused, setIsFocused] = useState({
    email: false,
    confirmEmail: false,
  });

  const navigation = useNavigation();

  const isEmailValid =
    email.endsWith('@gmail.com') && /.+@gmail\.com/.test(email);
  const emailsMatch = email === confirmEmail;

  const isButtonEnabled = isEmailValid && emailsMatch;

  const updateEmail = async () => {};

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
          <IconButton icon={<ArrowIcon />} onPress={()=>navigation.goBack()}/>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Change Email Address</Text>
        <Text style={styles.subtitle}>
          Update your email address associated with your account.
        </Text>
        <View style={styles.section_input_container}>
          <View style={styles.input_container}>
            <Text style={styles.label}>New email</Text>
            <View
              style={[
                styles.input_wrapper,
                isFocused.email ? styles.focused_border : styles.default_border,
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Enter your new email address"
                placeholderTextColor="#D9D2B080"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsFocused(prev => ({...prev, email: true}))}
                onBlur={() => setIsFocused(prev => ({...prev, email: false}))}
              />
            </View>
          </View>

          <View style={styles.input_container}>
            <Text style={styles.label}>Confirm email</Text>
            <View
              style={[
                styles.input_wrapper,
                isFocused.confirmEmail
                  ? styles.focused_border
                  : styles.default_border,
              ]}>
              <TextInput
                style={styles.input}
                placeholder="Confirm your new email address"
                placeholderTextColor="#D9D2B080"
                value={confirmEmail}
                onChangeText={setconfirmEmail}
                onFocus={() =>
                  setIsFocused(prev => ({...prev, confirmEmail: true}))
                }
                onBlur={() =>
                  setIsFocused(prev => ({...prev, confirmEmail: false}))
                }
              />
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
          onPress={updateEmail}
          disabled={!isButtonEnabled}
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
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#17261F',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#17261F',
    width: '100%',
    paddingStart: 10,
  },
  content: {
    width: '85%',
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 40,
    color: '#D9D2B0',
    textAlign: 'left',
    paddingTop: 20,
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

export default ChangeEmailScreen;
