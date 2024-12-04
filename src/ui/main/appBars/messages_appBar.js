import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const MessagesAppBar = () => {
  return (
    <View style={styles.appBar}>
      <Text style = {styles.title}>Messages</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 110,
    backgroundColor: '#0A0F0D',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 20,
    paddingStart: 20,
  },
  appBarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 40,
    color: '#D9D2B0',
  },
});

export default MessagesAppBar;
