/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Petal1 from '../../assets/splash_screen_flower/petals/petal_1.svg';
import Petal2 from '../../assets/splash_screen_flower/petals/petal_2.svg';
import Petal3 from '../../assets/splash_screen_flower/petals/petal_3.svg';
import Petal4 from '../../assets/splash_screen_flower/petals/petal_4.svg';
import Petal5 from '../../assets/splash_screen_flower/petals/petal_5.svg';
import Petal6 from '../../assets/splash_screen_flower/petals/petal_6.svg';

const PetalAnimation = () => {
  const petalAnimations = Array(6)
    .fill(0)
    .map(() => ({
      translateX: useRef(new Animated.Value(0)).current,
      translateY: useRef(new Animated.Value(-60)).current,
      rotate: useRef(new Animated.Value(0)).current,
      opacity: useRef(new Animated.Value(0)).current,
    }));

  const petalInitialPositions = [
    { x: -150, y: -150 },
    { x: 137, y: -160 },
    { x: 110, y: 0 },
    { x: 60, y: 90 },
    { x: -127, y: 50 },
    { x: -117, y: -50 },
  ];

  useEffect(() => {
    const startAnimations = () => {
      petalAnimations.forEach((animation, index) => {
        Animated.parallel([
          Animated.timing(animation.opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animation.translateX, {
            toValue: petalInitialPositions[index].x,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animation.translateY, {
            toValue: petalInitialPositions[index].y,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          const animatePetal = () => {
            Animated.parallel([
              Animated.timing(animation.translateX, {
                toValue: petalInitialPositions[index].x + Math.random() * 50 - 40,
                duration: 2000 + Math.random() * 1000,
                useNativeDriver: true,
              }),
              Animated.timing(animation.translateY, {
                toValue: petalInitialPositions[index].y + Math.random() * 50 - 40,
                duration: 2000 + Math.random() * 1000,
                useNativeDriver: true,
              }),
            ]).start(() => {
              animatePetal();
            });
          };

          animatePetal();
        });
      });
    };

    const timeout = setTimeout(startAnimations, 3000);

    return () => clearTimeout(timeout);
  }, [petalAnimations, petalInitialPositions]);

  return (
    <View style={styles.container}>
      {[Petal1, Petal2, Petal3, Petal4, Petal5, Petal6].map((Petal, index) => {
        const { translateX, translateY, rotate, opacity } = petalAnimations[index];

        const transformStyle = {
          transform: [
            { translateX },
            { translateY },
            {
              rotate: rotate.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
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

export default PetalAnimation;
