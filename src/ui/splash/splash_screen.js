import React from 'react';
import { View, StyleSheet } from 'react-native';
import FlowerAnimation from '../animations/flower_animation';
import PetalAnimation from '../animations/petals_animation';
import TitleTextAnimation from '../animations/title_text_animation';
import HeadTextAnimation from '../animations/head_text_animation';
import SubtitleTextAnimation from '../animations/subtitle_text_animation';
import DivisorAnimation from '../animations/divisor_animation';
import ButtonAnimation from '../animations/button_animation';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <HeadTextAnimation/>
      <FlowerAnimation />
      <TitleTextAnimation/>
      <PetalAnimation />
      <SubtitleTextAnimation/>
      <DivisorAnimation />
      <ButtonAnimation
      title={'Create an account'}
      backgroundColor="#D97904"
      borderRadius={100}
      width={'95%'}
      height={60}
      marginTop={20}
      fontFamily="RobotoRegular"
      />
      <ButtonAnimation
      title={'Log in'}
      backgroundColor="transparent"
      borderWidth={1}
      borderColor="#747474"
      borderRadius={100}
      width="95%"
      height={60}
      marginTop={20}
      fontFamily="RobotoRegular"
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
