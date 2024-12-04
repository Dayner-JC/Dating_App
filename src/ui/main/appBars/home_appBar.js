import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../../components/icon_button';
import NotificationsIcon from '../../../assets/icons/notifications.svg';
import FilterIcon from '../../../assets/icons/filters.svg';
import Flower from '../../../assets/splash_screen_flower/flower.svg';

const HomeAppBar = () => {
  return (
    <View style={styles.appBar}>
      <Flower width={50} height={50} />
      <View style={styles.buttonContainer}>
        <IconButton
          icon={<NotificationsIcon/>}
          onPress={() => {}}
          style={styles.notificationButton}
        />
        <IconButton
          icon={<FilterIcon/>}
          onPress={() => {}}
          style={styles.filterButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 72,
    backgroundColor: '#0A0F0D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '25%',
  },
  notificationButton: {
    marginRight: 0,
  },
});

export default HomeAppBar;
