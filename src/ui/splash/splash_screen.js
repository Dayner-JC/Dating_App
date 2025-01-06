import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Dimensions } from 'react-native';
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
      <StatusBar backgroundColor="#17261F" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.head_text}>
        <HeadTextAnimation />
        </View>
        <FlowerAnimation />
        <TitleTextAnimation />
        <PetalsSplashScreenAnimation />
        <SubtitleTextAnimation
          onTermsPress={() => alert('Terms Pressed')}
          onPrivacyPress={() => alert('Privacy Policy Pressed')}
          onCookiesPress={() => alert('Cookies Policy Pressed')}
        />
        <View style={styles.divisor}>
         <DivisorAnimation />
        </View>
        <View style={styles.button_container}>
        <ButtonAnimation
          title={'Create an account'}
          fontFamily="Roboto_500"
          fontSize={16}
          backgroundColor="#D97904"
          borderRadius={100}
          height={55}
          marginTop={20}
          onPress={() => navigation.navigate('RegisterPhoneScreen')}
        />
        <ButtonAnimation
          title={'Log in'}
          fontFamily="Roboto_500"
          fontSize={16}
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="#747474"
          borderRadius={100}
          height={55}
          marginTop={20}
          onPress={() => navigation.navigate('LoginPhoneScreen')}
        />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17261F',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  head_text: {
    width: '100%',
    paddingStart: '5%',
  },
  button_container:{
    width: '90%',
  },
  divisor:{
    width: '90%',
  },
});

export default SplashScreen;
