import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AudioMessage from './audio/audioMessage';

const Message = ({ message }) => {
  if (message.from === 'other') {
    return (
      <View style={styles.messageRow}>
        <Image
          source={require('../../../assets/image.png')}
          style={styles.avatar}
        />
        <View style={styles.messageColumn}>
          {message.type === 'text' && (
            <View style={styles.messageBubbleOther}>
              <Text style={styles.messageText}>{message.data}</Text>
            </View>
          )}
          {message.type === 'photo' && (
            <Image
              source={require('../../../assets/image-2.jpeg')}
              style={styles.messageImage}
            />
          )}
          {message.type === 'audio' && (
            <View style={styles.messageBubbleOther}>
              <AudioMessage uri={message.data} />
            </View>
          )}
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.messageColumnRight}>
        {message.type === 'text' && (
          <View style={styles.messageBubbleMe}>
            <Text style={styles.messageText}>{message.data}</Text>
          </View>
        )}
        {message.type === 'photo' && (
          <Image
            source={require('../../../assets/image-2.jpeg')}
            style={styles.messageImage}
          />
        )}
        {message.type === 'audio' && (
          <View style={styles.messageBubbleMe}>
            <AudioMessage uri={message.data} />
          </View>
        )}
        <Text style={styles.messageTime}>{message.time}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  messageColumn: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  messageColumnRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  messageBubbleOther: {
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: '#15412D',
    padding: 10,
    maxWidth: '80%',
  },
  messageBubbleMe: {
    borderRadius: 10,
    borderBottomRightRadius: 0,
    backgroundColor: '#2B2B2B',
    padding: 10,
    maxWidth: '80%',
  },
  messageText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  messageTime: {
    color: '#747474',
    fontFamily: 'Roboto',
    fontSize: 12,
  },
  messageImage: {
    width: 124,
    height: 168,
    borderRadius: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Message;
