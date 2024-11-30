import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import FlowerSvg from '../../assets/splash_screen_flower/flower.svg';

const FlowerAnimation = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
        Animated.delay(1000),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.69,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -30,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [scale, translateY]);

  return (
    <Animated.View
      style={{
        transform: [{ scale }, { translateY }],
      }}
    >
      <FlowerSvg width={230} height={230} />
    </Animated.View>
  );
};

export default FlowerAnimation;
