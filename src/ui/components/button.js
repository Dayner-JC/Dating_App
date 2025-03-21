import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const Button = ({
  title,
  onPress,
  backgroundColor = '#17d61F',
  selectedBackgroundColor = '',
  isSelected = false,
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
  fontWeight = '',
  fontFamily = '',
  textAlign = 'center',
  icon = null,
  iconPosition = 'left',
  iconSpacing = 10,
  disabled = false,
  disabledBackgroundColor = '',
  disabledTextColor = '',
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled
            ? disabledBackgroundColor
            : isSelected
            ? selectedBackgroundColor
            : backgroundColor,
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
      onPress={!disabled ? onPress : null}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <View style={styles.content}>
        {icon && iconPosition === 'left' && (
          <View style={{ marginRight: iconSpacing }}>{icon}</View>
        )}
        <Text
          style={[
            styles.buttonText,
            {
              color: disabled ? disabledTextColor : textColor,
              fontSize,
              fontFamily,
              fontWeight,
              textAlign,
            },
          ]}
        >
          {title}
        </Text>
        {icon && iconPosition === 'right' && (
          <View style={{ marginLeft: iconSpacing }}>{icon}</View>
        )}
      </View>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
