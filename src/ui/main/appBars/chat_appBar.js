import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ArrowLeftIcon from '../../../assets/icons/arrow-left.svg';
import MoreIcon from '../../../assets/icons/more.svg';
import Phone3Icon from '../../../assets/icons/phone-3.svg';
import VideoCameraIcon from '../../../assets/icons/video-camera.svg';

import {View, StyleSheet, Image, Text} from 'react-native';
import IconButton from '../../components/icon_button';

const ChatAppBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.appBar}>
      <View style={styles.container}>
        <IconButton
          icon={<ArrowLeftIcon />}
          onPress={() => navigation.goBack()}
        />
        <Image
          source={require('../../../assets/image.png')}
          style={styles.avatar}
        />
        <Text style={styles.userInfo}>
          Max, 26
        </Text>
      </View>
      <View style={styles.container}>
        <IconButton icon={<VideoCameraIcon />} style={styles.button} />
        <IconButton icon={<Phone3Icon />} style={styles.button} />
        <IconButton icon={<MoreIcon />} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_700',
    fontSize: 16,
    padding: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: 40,
  },
});

export default ChatAppBar;
