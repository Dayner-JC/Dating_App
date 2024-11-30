import React, { useEffect, useState } from 'react';
import { Animated , StyleSheet , Text} from 'react-native';

const SubtitleTextAnimation = () => {
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
      <Text style={styles.title}>By using this app you are accepting our Terms.{'\n'}
        Check how we use your data in our Privacy Policy{'\n'}
        and Cookies Policy.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    title: {
      fontFamily: 'RobotoRegular',
      color: '#D9D2B0',
      textAlign: 'center',
      marginHorizontal: 20,
      marginTop: 20,
      fontWeight: 400,
      fontSize: 12,
      letterSpacing: 2,
    },
  });

export default SubtitleTextAnimation;
