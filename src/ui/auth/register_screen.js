import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChevronDownIcon from '../../assets/icons/chevron-down.svg';
import CountryPicker from 'react-native-country-picker-modal';
import Button from '../components/button';
import PetalsRegisterScreenAnimation from '../animations/petals_register_screen_animation';
import GoogleIcon from '../../assets/icons/google.svg';
import FacebookIcon from '../../assets/icons/facebook.svg';
import AppleIcon from '../../assets/icons/apple.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [countryCode, setCountryCode] = useState('US');
  // eslint-disable-next-line no-unused-vars
  const [callingCode, setCallingCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(`+${country.callingCode}`);
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
    >
    <View style={styles.container}>
      <PetalsRegisterScreenAnimation />

      <View style={styles.content}>
        <Text style={styles.title_text}>Sign up</Text>
        <Text style={styles.subtitle_text}>Enter your phone number to create your account.</Text>

        <View style={styles.input_container}>
          <Text style={styles.phone_number_text}>Phone Number</Text>
          <View style={styles.phone_input_container}>
            <View style={styles.country_picker}>
              <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withCallingCode
                  withFilter
                  withCallingCodeButton
                  onSelect={onSelect}
                  theme={{
                      backgroundColor: '#17261F',
                      onBackgroundTextColor: '#FFFFFF',
                  }}
              />
              <ChevronDownIcon width={15} height={15} fill="#FFFFFF" style={styles.icon} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="000 000 0000"
              placeholderTextColor="#D9D2B03D"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        <Button
          title="Sign up"
          fontSize = {16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          borderRadius={100}
          width={'100%'}
          height={55}
        />

        <View style={styles.or_container}>
          <View style={styles.line} />
          <Text style={styles.or_text}>or</Text>
          <View style={styles.line} />
        </View>

        <Button
          title="Sign up with Facebook"
          fontSize={14}
          fontFamily="Roboto_400"
          backgroundColor="transparent"
          textColor="#D9D2B0"
          borderWidth={1}
          borderColor="#747474"
          borderRadius={100}
          width="100%"
          height={55}
          icon={<FacebookIcon width={20} height={20}/>}
        />
        <Button
          title="Sign up with Google"
          fontSize={14}
          fontFamily="Roboto_400"
          backgroundColor="transparent"
          textColor="#D9D2B0"
          borderWidth={1}
          borderColor="#747474"
          borderRadius={100}
          width="100%"
          height={55}
          marginTop={15}
          icon={<GoogleIcon width={20} height={20}/>}
        />
        <Button
          title="Sign up with Apple"
          fontSize={14}
          fontFamily="Roboto_400"
          backgroundColor="transparent"
          textColor="#D9D2B0"
          borderWidth={1}
          borderColor="#747474"
          borderRadius={100}
          width="100%"
          height={55}
          marginTop={15}
          icon={<AppleIcon width={20} height={20}/>}
        />
        <Text style={styles.footer_text} onPress={() => navigation.navigate('LoginScreen')}>
        Already have an account?{'  '}
          <Text style={styles.sign_up_text}>Sign in</Text>
        </Text>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17261F',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    width: '85%',
    alignItems: 'flex-start',
  },
  title_text: {
    fontFamily: 'GreatMangoDemo',
    color: '#D9D2B0',
    fontWeight: '400',
    lineHeight: 57,
    fontSize: 48,
    letterSpacing: 2,
  },
  subtitle_text: {
    fontFamily: 'Roboto_400',
    color: '#D9D2B0',
    fontSize: 14,
    marginBottom: 50,
  },
  input_container: {
    width: '100%',
    marginBottom: 20,
  },
  phone_number_text: {
    fontFamily: 'Roboto_500',
    color: '#D9D2B0',
    fontSize: 12,
    marginBottom: 5,
  },
  phone_input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2D24',
    borderWidth: 1,
    borderColor: '#D9D2B0',
    borderRadius: 5,
    height: 60,
  },
  country_picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121D18',
    marginRight: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderEndWidth: 1,
    borderEndColor: '#D9D2B0',
    height: '100%',
    paddingEnd: 10,
    paddingStart: 10,
  },
  icon: {
    marginLeft: 5,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  or_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#2A372D',
  },
  or_text: {
    fontFamily: 'Roboto_300',
    color: '#D9D2B0',
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
  },
  footer_text: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    textAlign: 'center',
    marginTop: 40,
    width: '100%',
  },
  sign_up_text: {
    fontFamily: 'Roboto_500',
    fontSize: 14,
    color: '#D97904',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
