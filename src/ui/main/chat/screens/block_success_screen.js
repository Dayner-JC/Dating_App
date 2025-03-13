import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Button from '../../../components/button';
import IconButton from '../../../components/icon_button';
import ArrowIcon from '../../../../assets/icons/arrow-left.svg';
import Background from '../../../../assets/backgrounds/2.svg';
import Frame from '../../../../assets/frame.svg';
import { useNavigation } from '@react-navigation/native';

const BlockSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#17261F" />
      <View style={styles.appBar}>
         <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <Background style={styles.background} />
      <View style={styles.content}>
      <Frame style={styles.frame}/>
        <Text style={styles.title}>The user has been blocked.</Text>
        <Text style={styles.subtitle}>This user will no longer be able to contact you.</Text>
        <Button
          title="Back to Home"
          fontFamily="Roboto_500"
          fontSize={16}
          backgroundColor="#D97904"
          textColor="#D9D2B0"
          borderRadius={100}
          height={55}
          marginTop={30}
          onPress={() => navigation.navigate('Main')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#17261F',
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#17261F',
    width: '100%',
    paddingStart: 10,
    zIndex: 1,
  },
  frame: {
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  content: {
    flex: 1,
    width: '85%',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 40,
    color: '#D9D2B0',
    textAlign: 'center',
    marginTop: 50,
  },
  subtitle: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#D9D2B0',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default BlockSuccessScreen;
