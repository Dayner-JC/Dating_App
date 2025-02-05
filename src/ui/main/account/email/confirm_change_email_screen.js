import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Button from '../../../components/button';
import {useNavigation} from '@react-navigation/native';
import Petal1 from '../../../../assets/splash_screen_flower/petals/petal_7.svg';
import Petal2 from '../../../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../../../assets/splash_screen_flower/petals/petal_10.svg';

const ConfirmChangeEmailScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#17261F" />
      <View style={styles.content}>
        <Text style={styles.title}>Confirm Change Email Address!!!</Text>
        <Text style={styles.subtitle}>
          Attention!{'\n'}Your email address has been updated in our database.
          However, in order to sign in with your new email address, you need to
          complete the final verification sent by Firebase. Please check your
          inbox and click on the verification link we sent to your new email. If
          you do not complete this verification, you will not be able to access
          your account with the new email address. If you have already completed
          this verification, you can continue. Otherwise, please do not leave
          this screen.
        </Text>

        <Button
          title="I have verified it"
          fontSize={16}
          fontFamily="Roboto_500"
          backgroundColor="#D97904"
          disabledBackgroundColor="#8b580f"
          disabledTextColor="#a2a8a5"
          borderRadius={100}
          width="100%"
          height={55}
          onPress={() => navigation.navigate('SplashScreen')}
          marginTop={80}
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
    paddingTop: 80,
  },
  subtitle: {
    fontFamily: 'Roboto_400',
    fontSize: 22,
    color: '#D9D2B0',
    textAlign: 'left',
    marginTop: 50,
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

export default ConfirmChangeEmailScreen;
