import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const SubtitleTextAnimation = ({ onTermsPress, onPrivacyPress, onCookiesPress }) => {
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
      <Text style={styles.title}>
        By using this app you are accepting our{' '}
        <Text style={styles.link} onPress={onTermsPress}>
          Terms
        </Text>
        .{'\n'}Check how we use your data in our{' '}
        <Text style={styles.link} onPress={onPrivacyPress}>
          Privacy Policy
        </Text>{'\n'}
        and{' '}
        <Text style={styles.link} onPress={onCookiesPress}>
          Cookies Policy
        </Text>
        .
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto_400',
    color: '#D9D2B0',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    fontSize: 14,
  },
  link: {
    color: '#E6A000',
    fontFamily: 'Roboto_400',
  },
});

export default SubtitleTextAnimation;
