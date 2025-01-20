import React from 'react';
import { View, Text,  StyleSheet, StatusBar, Alert } from 'react-native';
import { handlePhoneRegister } from '../../../infrastructure/auth/register/register_phone';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Button from '../../components/button';
import Petal1 from '../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../assets/splash_screen_flower/petals/petal_10.svg';

const TwoFASmsScreen = ({ route, navigation }) => {
  const { userPhoneNumber, userId } = route.params;

  const match = userPhoneNumber.match(/^(\+\d{1,4}) (\d{6,15})$/);
  const callingCode = match ? match[1] : null;
  const phoneNumber = match ? match[2] : null;

  if (!callingCode || !phoneNumber) {
    Alert.alert('Error', 'Invalid phone number format.');
    navigation.goBack();
    return null;
  }

  const handleContinue = async () => {
    console.log(callingCode, phoneNumber);
    try {
      const confirmation = await handlePhoneRegister(callingCode, phoneNumber);
      if (confirmation) {
        navigation.navigate('VerifyCode2FaSmsScreen', {
          confirmationId: confirmation,
          userPhoneNumber,
          userId: userId,
        });
      }
    } catch (error) {
      console.error('Error during SMS verification:', error);
      Alert.alert('Error', 'Failed to send verification code.');
    }
  };

    return (
      <View style={styles.container}>
                  <StatusBar backgroundColor="#17261F" />
        <View style={styles.appBar}>
           <IconButton icon={<ArrowIcon />} onPress={()=>{navigation.goBack();}} />
        </View>
          <View style={styles.content}>
        <Text style={styles.title}>Send Code</Text>
        <Text style={styles.subtitle}>
        By continuing you will be sent an SMS with a verification code to the number {userPhoneNumber}.
        </Text>
        <Button
            title="Send Code"
            onPress={handleContinue}
            backgroundColor="#D97904"
            borderRadius={100}
            width="100%"
            height={55}
            marginTop={40}
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
          marginTop: 40,
        },
        subtitle: {
          fontFamily: 'Roboto_400',
          fontSize: 14,
          color: '#D9D2B0',
          textAlign: 'left',
          marginTop: 10,
        },
        optionHeadText: {
          fontFamily: 'Roboto_400',
          fontSize: 14,
          color: '#D9D2B0',
          textAlign: 'left',
          marginBottom: 20,
        },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#525853',
      backgroundColor: '#5258531A',
      padding: 15,
      borderRadius: 8,
      marginBottom: 15,
      height: 64,
    },
    optionIcon: {
      marginRight: 15,
    },
    selectedIcon: {
      color: '#FFFFFF',
    },
    optionContainer: {
      marginVertical: 35,
    },
    selectedOption: {
      backgroundColor: '#3A341B',
      borderColor: '#D97904',
    },
    optionTextContainer: {
      flex: 1,
    },
    optionTitle: {
      fontFamily: 'Roboto_500',
      fontSize: 16,
      color: '#D9D2B0',
    },
    optionSubtitle: {
      fontFamily: 'Roboto_400',
      fontSize: 12,
      color: '#D9D2B0',
      marginTop: 3,
    },
    optionTitleSelected: {
      color: '#FFFFFF',
    },
    optionSubtitleSelected: {
      color: '#FFFFFF',
    },
    circle: {
      width: 20,
      height: 20,
      borderWidth: 0.5,
      borderColor: '#DADADA',
      borderRadius: 10,
    },
    selectedCircle: {
      borderWidth: 3.5,
      backgroundColor: '#FFFFFF',
      borderColor: '#D97904',
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

export default TwoFASmsScreen;
