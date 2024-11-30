import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Button from '../components/button';

const ButtonAnimation = (props) => {
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
    <Animated.View style={[styles.animatedView, { opacity, width: props.width }]}>
      <Button {...props} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    alignItems: 'center',
  },
});

export default ButtonAnimation;
