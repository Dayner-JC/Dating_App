import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Button from '../../components/button';
import MessageIcon from '../../../assets/icons/message.svg';
import BarCodeIcon from '../../../assets/icons/scan-barcode.svg';
import MessageWhiteIcon from '../../../assets/icons/message-white.svg';
import BarCodeWhiteIcon from '../../../assets/icons/scan-barcode-white.svg';

const TwoFAEnableScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (selectedOption === 'app') {
      navigation.navigate('TwoFAAuthenticatorScreen');
    } else if (selectedOption === 'sms') {
      try {
        setIsLoading(true);
        const currentUser = auth().currentUser;
        if (!currentUser) {
          Alert.alert('Error', 'No authenticated user found.');
          return;
        }

        const response = await fetch(
          'http://10.0.2.2:5001/dating-app-7a6f7/us-central1/api/auth/2fa/enable-sms',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uid: currentUser.uid }),
          }
        );

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || 'Failed to enable SMS 2FA.');
        }

        navigation.navigate('TwoFASmsScreen', {
          userPhoneNumber: result.phoneNumber,
        });
      } catch (error) {
        console.error('Error enabling SMS 2FA:', error);
        Alert.alert('Error', error.message || 'Failed to enable SMS 2FA.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isContinueDisabled = !selectedOption || isLoading;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Enable Two-Factor Authentication</Text>
        <Text style={styles.subtitle}>
          Enhance your account security by adding a verification code alongside your password.
        </Text>
        <View style={styles.optionContainer}>
          <Text style={styles.optionHeadText}>Select an authentication method:</Text>
          <TouchableOpacity
            style={[styles.option, selectedOption === 'app' && styles.selectedOption]}
            onPress={() => setSelectedOption('app')}
          >
            {selectedOption === 'app' ? (
              <BarCodeWhiteIcon style={styles.optionIcon} />
            ) : (
              <BarCodeIcon style={styles.optionIcon} />
            )}
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Authentication App</Text>
              <Text style={styles.optionSubtitle}>Use apps like Google Authenticator.</Text>
            </View>
            <View style={[styles.circle, selectedOption === 'app' && styles.selectedCircle]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, selectedOption === 'sms' && styles.selectedOption]}
            onPress={() => setSelectedOption('sms')}
          >
            {selectedOption === 'sms' ? (
              <MessageWhiteIcon style={styles.optionIcon} />
            ) : (
              <MessageIcon style={styles.optionIcon} />
            )}
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionTitle, selectedOption === 'sms' && styles.optionTitleSelected]}>
                SMS
              </Text>
              <Text style={[styles.optionSubtitle, selectedOption === 'sms' && styles.optionSubtitleSelected]}>
                Receive a unique code on your phone.
              </Text>
            </View>
            <View style={[styles.circle, selectedOption === 'sms' && styles.selectedCircle]} />
          </TouchableOpacity>
        </View>
        <Button
          title="Continue"
          onPress={handleContinue}
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width="100%"
          height={55}
          disabled={isContinueDisabled}
        />
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

export default TwoFAEnableScreen;
