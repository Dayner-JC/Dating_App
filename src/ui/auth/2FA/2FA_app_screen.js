import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import CopyIcon from '../../../assets/icons/copy.svg';
import Button from '../../components/button';
import QRCode from '../../../assets/qrcode.svg';

const TwoFAAuthenticatorScreen = () => {
    const [authKey, setAuthKey] = useState(generateRandomKey());

    function generateRandomKey() {
      return 'AOE3-B10N-0SD0-GJ35-0FD7';
    }

    const handleCopyToClipboard = () => {
      Clipboard.setString(authKey);
      console.log('Code copied:', authKey);
    };

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={()=>{}} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Connect with your app</Text>
        <Text style={styles.subtitle}>Use apps like Google Authenticator or Authy.</Text>

        <View style={styles.qrContainer}>
            <QRCode/>
        </View>

        <Text style={styles.instructions}>1. Scan the QR Code with your authenticator app.</Text>

        <View style={styles.or_container}>
            <View style={styles.line} />
                <Text style={styles.or_text}>or</Text>
            <View style={styles.line} />
        </View>

        <Text style={styles.keyText}>Key</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={authKey}
            editable={false}
            selectTextOnFocus
          />
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyToClipboard}>
            <CopyIcon width={24} height={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.instructions}>2. Enter the key manually in your authentication app.</Text>

        <Button
          title="Continue"
          onPress={() => {}}
          backgroundColor="#D97904"
          borderRadius={100}
          width="100%"
          height={55}
          marginTop={100}
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
    qrContainer: {
      alignItems: 'center',
      marginTop: 40,
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
      keyText: {
        fontFamily: 'Roboto_500',
        color: '#D9D2B0',
        fontSize: 12,
        marginBottom: 5,
      },
    instructions: {
        fontFamily: 'Roboto_400',
        fontSize: 13,
        color: '#D9D2B0',
        textAlign: 'center',
        marginTop: 15,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#D9D2B0',
      borderRadius: 8,
      backgroundColor: '#00251C',
    },
    input: {
      flex: 1,
      padding: 10,
      color: '#FFFFFF',
      fontSize: 16,
    },
    copyButton: {
      padding: 10,
      borderLeftWidth: 1,
      borderColor: '#D9D2B0',
      backgroundColor: '#121D18',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    continueButton: {
      backgroundColor: '#FF9F0A',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#001F18',
    },
  });

export default TwoFAAuthenticatorScreen;
