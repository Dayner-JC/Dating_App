import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../../components/icon_button';
import ArrowIcon from '../../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';

const VerifyCodeAppBar = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.appBar}>
        <IconButton
          icon={<ArrowIcon/>}
          onPress={() => navigation.navigate('LoginPhoneScreen')}
        />
        <View style={styles.box} />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 72,
    width: '100%',
    backgroundColor: '#17261F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingStart: 10,
  },
  box:{
    width: '85%',
  },
});

export default VerifyCodeAppBar;
