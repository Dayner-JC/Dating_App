import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const messages = [
  { id: '1', name: 'Max', age: 23, message: 'Nice to meet you :)', time: '5m' },
  { id: '2', name: 'Debra', age: 29, message: 'Hi!', time: '6h' },
  { id: '3', name: 'Philip', age: 21, message: 'You are beautiful', time: '10h' },
  { id: '4', name: 'Cameron', age: 33, message: 'I love your eyes..', time: '1d' },
  { id: '5', name: 'Greg', age: 28, message: 'You\'re welcome!', time: '2d' },
  { id: '6', name: 'Leslie', age: 30, message: 'You: Nice', time: '3d' },
  { id: '7', name: 'Cody', age: 31, message: 'Yeah!', time: '5d' },
  { id: '8', name: 'Arlene', age: 28, message: 'hahaha', time: 'Last week' },
  { id: '9', name: 'Kyle', age: 35, message: 'Hi', time: 'Last month' },
];

export default function MessagesFragment() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem}>
      <Image
        source={require('../../../assets/image.png')}
        style={styles.avatar}
      />
      <View style={styles.messageContent}>
        <Text style={styles.name}>
          {item.name}, {item.age}
        </Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0D',
  },
  list: {
    paddingVertical: 10,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222322',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontFamily: 'Roboto_700',
    fontSize: 16,
  },
  messageText: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
  },
  time: {
    fontFamily: 'Inter_300',
    color: '#D9D2B0',
    fontSize: 12,
  },
});
