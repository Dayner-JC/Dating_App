import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({
  title,
  onPress,
  backgroundColor = '#17d61F',
  textColor = '#fff',
  width = '100%',
  height = 50,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  paddingVertical = 0,
  paddingHorizontal = 0,
  borderWidth = 0,
  borderColor = 'transparent',
  borderRadius = 0,
  fontSize = 16,
  fontWeight = 'bold',
  fontFamily = 'System',
  textAlign = 'center',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          width,
          height,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          paddingVertical,
          paddingHorizontal,
          borderWidth,
          borderColor,
          borderRadius,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: textColor,
            fontSize,
            fontFamily,
            fontWeight,
            textAlign,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
