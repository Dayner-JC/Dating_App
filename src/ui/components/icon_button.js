import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const IconButton = ({ icon, onPress, style }) => (
  <TouchableOpacity style={[styles.iconButton, style]} onPress={onPress}>
    {icon}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
});

export default IconButton;
