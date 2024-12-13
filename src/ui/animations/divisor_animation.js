import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

const DivisorAnimation = () => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const fadeIn = Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });

    Animated.sequence([
      Animated.delay(1000),
      fadeIn,
    ]).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.divisor,
        { opacity },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divisor: {
    height: 2,
    width: '100%',
    backgroundColor: '#D9D2B01A',
    marginTop: 15,
  },
});

export default DivisorAnimation;
