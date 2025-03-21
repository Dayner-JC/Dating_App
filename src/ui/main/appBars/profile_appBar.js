import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProfileAppBar = () => {
  return (
    <View style={styles.appBar}>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 72,
    backgroundColor: '#0A0F0D',
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileAppBar;
