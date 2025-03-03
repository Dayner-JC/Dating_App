import React from 'react';
import { View, StyleSheet } from 'react-native';

const MatchesAppBar = () => {
  return (
    <View style={styles.appBar} />
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 20,
    backgroundColor: '#0A0F0D',
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MatchesAppBar;
