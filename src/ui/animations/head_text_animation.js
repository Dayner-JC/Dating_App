import React, { useEffect, useState } from 'react';
import { Animated , StyleSheet , Text} from 'react-native';

const HeadTextAnimation = () => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const fadeOut = Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });

    Animated.sequence([
      Animated.delay(1000),
      fadeOut,
    ]).start();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <Text style={styles.title}>Designed to{'\n'}have fun and{'\n'}find love.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    title: {
      fontFamily: 'GreatMangoDemo',
      color: '#D9D2B0',
      fontWeight: 400,
      lineHeight: 57,
      fontSize: 48,
      letterSpacing: 2,
      marginBottom: 20,
    },
  });

export default HeadTextAnimation;
