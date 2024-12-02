/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Petal1 from '../../assets/splash_screen_flower/petals/petal_12.svg';
import Petal2 from '../../assets/splash_screen_flower/petals/petal_8.svg';
import Petal3 from '../../assets/splash_screen_flower/petals/petal_13.svg';
import Petal4 from '../../assets/splash_screen_flower/petals/petal_14.svg';

const PetalsRegisterScreenAnimation = () => {
  const petalAnimations = Array(4)
    .fill(0)
    .map(() => ({
      translateX: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(1)).current,
    }));

  const petalInitialPositions = [
    { x: -150, y: -380 },
    { x: -150, y: 360 },
    { x: 110, y: 390 },
    { x: 160, y: 375 },
  ];

  useEffect(() => {
    const startAnimations = () => {
      petalAnimations.forEach((animation, index) => {

        animation.translateX.setValue(petalInitialPositions[index].x);
        animation.translateY.setValue(petalInitialPositions[index].y);

        const animatePetal = () => {
          Animated.parallel([
            Animated.timing(animation.translateX, {
              toValue: petalInitialPositions[index].x + Math.random() * 30 - 20,
              duration: 2000 + Math.random() * 1000,
              useNativeDriver: true,
            }),
            Animated.timing(animation.translateY, {
              toValue: petalInitialPositions[index].y + Math.random() * 30 - 20,
              duration: 2000 + Math.random() * 1000,
              useNativeDriver: true,
            }),
          ]).start(() => {
            animatePetal();
          });
        };

        animatePetal();
      });
    };

    const timeout = setTimeout(startAnimations, 0);

    return () => clearTimeout(timeout);
  }, [petalAnimations, petalInitialPositions]);

  return (
    <View style={styles.container}>
      {[Petal1, Petal2, Petal3, Petal4].map((Petal, index) => {
        const { translateX, translateY, opacity } = petalAnimations[index];

        const transformStyle = {
          transform: [
            { translateX },
            { translateY },
          ],
          opacity,
        };

        return (
          <Animated.View key={index} style={[styles.petal, transformStyle]}>
            <Petal width={40} height={40} />
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  petal: {
    position: 'absolute',
  },
});

export default PetalsRegisterScreenAnimation;
