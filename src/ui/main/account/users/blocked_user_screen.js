import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../../../components/icon_button';
import ArrowIcon from '../../../../assets/icons/arrow-left.svg';

const BlockedUserScreen = () => {
  const navigation = useNavigation();
  const [blockedUsers, setBlockedUsers] = useState([
    { id: 1, name: 'Max', age: 23, avatar: require('../../../../assets/user_2.jpg'), blocked: false },
    { id: 2, name: 'Greg', age: 28, avatar: require('../../../../assets/0.png'), blocked: false },
    { id: 3, name: 'Cody', age: 31, avatar: require('../../../../assets/6.png'), blocked: false },
    { id: 4, name: 'Debra', age: 29, avatar: require('../../../../assets/5.png'), blocked: false },
  ]);

  const toggleBlockStatus = (id) => {
    setBlockedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, blocked: !user.blocked } : user
      )
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
        <IconButton icon={<ArrowIcon />} onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.title}>Blocked Users</Text>
      <ScrollView>
        {blockedUsers.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <Image source={user.avatar} style={styles.avatar} />
            <Text style={styles.userName}>{user.name}, {user.age}</Text>
            <TouchableOpacity
              style={[styles.unblockButton, user.blocked ? styles.blockedButton : styles.unblockedButton]}
              onPress={() => toggleBlockStatus(user.id)}
            >
              <Text style={[styles.unblockText, user.blocked ? styles.blockedText : styles.unblockedText]}>
                {user.blocked ? 'Blocked' : 'Unblocked'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
    paddingBottom: 20,
  },
  appBar: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#0A0F0D',
    width: '100%',
    paddingStart: 10,
  },
  title: {
    fontFamily: 'GreatMangoDemo',
    fontSize: 32,
    color: '#D9D2B0',
    marginStart: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userName: {
    fontFamily: 'Roboto_600',
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  unblockButton: {
    borderRadius: 8,
    width: 106,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unblockedButton: {
    borderWidth: 1,
    borderColor: '#525853',
    backgroundColor: 'transparent',
  },
  blockedButton: {
    backgroundColor: '#D97904',
  },
  unblockText: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
  },
  unblockedText: {
    color: '#D9D2B0',
  },
  blockedText: {
    color: '#FFFFFF',
  },
});

export default BlockedUserScreen;
