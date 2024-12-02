import React from 'react';
import { View, StyleSheet } from 'react-native';

const FavoritesAppBar = () => {
  return (
    <View style={styles.appBar}>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 72,
    backgroundColor: '#17261F',
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

export default FavoritesAppBar;
