import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FlowerAnimation from '../animations/flower_animation';
import PetalsSplashScreenAnimation from '../animations/petals_splash_screen_animation';
import TitleTextAnimation from '../animations/title_text_animation';
import HeadTextAnimation from '../animations/head_text_animation';
import SubtitleTextAnimation from '../animations/subtitle_text_animation';
import DivisorAnimation from '../animations/divisor_animation';
import ButtonAnimation from '../animations/button_animation';

const SplashScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#17261F"
      />
      <HeadTextAnimation/>
      <FlowerAnimation />
      <TitleTextAnimation/>
      <PetalsSplashScreenAnimation />
      <SubtitleTextAnimation
        onTermsPress={() => alert('Terms Pressed')}
        onPrivacyPress={() => alert('Privacy Policy Pressed')}
        onCookiesPress={() => alert('Cookies Policy Pressed')}
      />
      <DivisorAnimation />
      <ButtonAnimation
      title={'Create an account'}
      backgroundColor="#D97904"
      borderRadius={100}
      width={'95%'}
      height={55}
      marginTop={20}
      fontFamily="RobotoRegular"
      onPress={() => navigation.navigate('RegisterScreen')}
      />
      <ButtonAnimation
      title={'Log in'}
      backgroundColor="transparent"
      borderWidth={1}
      borderColor="#747474"
      borderRadius={100}
      width="95%"
      height={55}
      marginTop={20}
      fontFamily="RobotoRegular"
      onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
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
});

export default SplashScreen;
