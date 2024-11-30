import React, { useEffect, useState } from 'react';
import { Animated , StyleSheet , Text} from 'react-native';

const TextAnimation = () => {
  const [opacity] = useState(new Animated.Value(1));

  useEffect(() => {
    const fadeOut = Animated.timing(opacity, {
      toValue: 0,
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
      <Text style={styles.title}>Dating App</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    title: {
      fontFamily: 'GreatMangoDemo',
      color: '#D9D2B0',
      fontWeight: 400,
      fontSize: 40,
      letterSpacing: 2,
      marginTop: 10,
    },
  });

export default TextAnimation;
