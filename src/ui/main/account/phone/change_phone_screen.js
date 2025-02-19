import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChevronDownIcon from '../../../../assets/icons/chevron-down.svg';
import CountryPicker from 'react-native-country-picker-modal';
import Button from '../../../components/button';
import IconButton from '../../../components/icon_button';
import ArrowIcon from '../../../../assets/icons/arrow-left.svg';
import auth from '@react-native-firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Petal2 from '../../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../../assets/splash_screen_flower/petals/petal_9.svg';
import Petal4 from '../../../../assets/splash_screen_flower/petals/petal_10.svg';

const ChangePhoneScreen = () => {
    const navigation = useNavigation();
    const [countryCode, setCountryCode] = useState('US');
    const [callingCode, setCallingCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const onSelect = (country) => {
      setCountryCode(country.cca2);
      setCallingCode(`+${country.callingCode}`);
    };

    const handlePhoneNumberChange = (text) => {
      const filteredText = text.replace(/[^0-9]/g, '');
      if (filteredText.length >= 8 && filteredText.length <= 10) {
        setPhoneNumber(filteredText);
      } else if (filteredText.length < 8) {
        setPhoneNumber(filteredText);
      }
    };

    const handleSendCode = async () => {
      try {
        const confirmResult = await auth().verifyPhoneNumber(`${callingCode} ${phoneNumber}`);

        navigation.navigate('VerifyCodeChangePhoneScreen', {
          verificationId: confirmResult.verificationId,
          phoneNumber: phoneNumber,
          callingCode: callingCode,
        });
      } catch (error) {
        Alert.alert('Failed to send verification code. Please try again.');
      }
    };

    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
      >
        <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
          <IconButton icon={<ArrowIcon />} onPress={()=>navigation.goBack()}/>
      </View>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title_text}>Change Phone Number</Text>
          <Text style={styles.subtitle_text}>Update your phone number associated with your account.</Text>

          <View style={styles.input_container}>
            <Text style={styles.phone_number_text}>New Phone Number</Text>
            <View
                style={[
                  styles.phone_input_container,
                  isFocused ? styles.focused_border : styles.default_border,
                ]}
              >
                <View
                  style={[
                    styles.country_picker,
                    { borderEndColor: isFocused ? '#D97904' : '#D9D2B0' },
                  ]}
                >
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
                onChangeText={handlePhoneNumberChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </View>
          </View>
          <Button
            title="Send Verification Code"
            fontSize = {16}
            fontFamily="Roboto_500"
            backgroundColor="#D97904"
            disabledBackgroundColor = "#8b580f"
            disabledTextColor = "#a2a8a5"
            borderRadius={100}
            width={'100%'}
            height={55}
            onPress={handleSendCode}
            disabled={phoneNumber.length < 8 || phoneNumber.length > 10}
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
        <View style={styles.bottom_petals_container}>
          <View>
            <Petal2 style={styles.petal2}/>
          </View>
          <View style={styles.bottom_petal_3_4_container}>
            <Petal3/>
            <Petal4/>
          </View>
        </View>
      </View>
      </KeyboardAwareScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#17261F',
      alignItems: 'center',
      position: 'relative',
      paddingVertical: 20,
      height: '100%',
    },
    appBar: {
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#17261F',
        paddingStart: 10,
      },
    content: {
      width: '85%',
      alignItems: 'flex-start',
    },
    title_text: {
      fontFamily: 'GreatMangoDemo',
      color: '#D9D2B0',
      fontSize: 40,
      letterSpacing: 1,
    },
    subtitle_text: {
      fontFamily: 'Roboto_400',
      color: '#D9D2B0',
      fontSize: 14,
      marginBottom: 35,
    },
    input_container: {
      width: '100%',
      marginBottom: 30,
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
    default_border: {
      borderColor: '#D9D2B0',
    },
    focused_border: {
      borderColor: '#D97904',
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
    bottom_petals_container: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
  },
  bottom_petal_3_4_container: {
    flexDirection: 'row',
    marginTop: 40,
  },
  petal2: {
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  });

export default ChangePhoneScreen;
