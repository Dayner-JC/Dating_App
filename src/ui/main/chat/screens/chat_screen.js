import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../../../components/icon_button';
import CameraIcon from '../../../../assets/icons/camera.svg';
import MicrophoneIcon from '../../../../assets/icons/microphone.svg';
import ArrowLeftIcon from '../../../../assets/icons/arrow-left.svg';
import MoreIcon from '../../../../assets/icons/more.svg';
import Phone3Icon from '../../../../assets/icons/phone-3.svg';
import VideoCameraIcon from '../../../../assets/icons/video-camera.svg';
import SendIcon from '../../../../assets/icons/send.svg';
import SlashIcon from '../../../../assets/icons/slash.svg';
import InfoIcon from '../../../../assets/icons/info-circle.svg';
import { getCurrentUserUID } from '../../../../infrastructure/uid/uid';
import API_BASE_URL from '../../../../config/config';
import { blockUser } from '../actions/block';
import { reportUser } from '../actions/report';
import BlockModal from '../modals/block_modal';
import ReportModal from '../modals/report_modal';
import Message from '../message';

const initialMessages = [
  {
    id: '1',
    from: 'other',
    type: 'text',
    data: 'Hey! I’m really excited. I feel like I can connect with you!',
    time: 'Feb 14, 11:46 pm',
  },
  {
    id: '2',
    from: 'me',
    type: 'text',
    data: 'I’m super excited too! It’s like we’re putting together a cool bridge to connect with each other even more!',
    time: 'Today, 9:46 pm',
  },
  {
    id: '3',
    from: 'me',
    type: 'audio',
    data: 'https://file-examples.com/storage/fed2ad2b0367b0dc39c76e2/2017/11/file_example_MP3_1MG.mp3',
    time: 'Today, 9:46 pm',
  },
  {
    id: '4',
    from: 'other',
    type: 'text',
    data: 'Could you share a photo? I want to make sure your eyes are real.',
    time: '2 h',
  },
  {
    id: '5',
    from: 'me',
    type: 'photo',
    data: '../../../assets/image-2.jpeg',
    time: '30 min',
  },
  {
    id: '6',
    from: 'me',
    type: 'audio',
    data: 'https://file-examples.com/storage/fed2ad2b0367b0dc39c76e2/2017/11/file_example_MP3_700KB.mp3',
    time: '30 min',
  },
];

const ChatScreen = () => {
  const navigation = useNavigation();
  const [modalBlockVisible, setModalBlockVisible] = useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherReason, setOtherReason] = useState('');
  const uid = getCurrentUserUID();
  const [showMenu, setShowMenu] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [messageList, setMessageList] = useState(initialMessages);

  const reasons = [
    { id: 'Inappropriate messages', label: 'Inappropriate messages' },
    { id: 'Suspicious behavior', label: 'Suspicious behavior' },
    { id: 'Spam or unwanted content', label: 'Spam or unwanted content' },
    { id: 'Other', label: 'Other' },
  ];

  const handleReport = () => {
    setShowMenu(false);
    setModalReportVisible(true);
  };

  const handleBlock = () => {
    setShowMenu(false);
    setModalBlockVisible(true);
  };

  const onConfirmBlock = async () => {
    const result = await blockUser({ uid, targetUid: 'mock-3', API_BASE_URL });
    if (result.success) {
      setModalBlockVisible(false);
      ToastAndroid.show('User successfully blocked', ToastAndroid.SHORT);
      navigation.navigate('BlockSuccessScreen');
    } else {
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
    }
  };

  const onSubmitReport = async () => {
    const result = await reportUser({
      reporterUid: uid,
      reportedUid: 'mock-1',
      reason: selectedReason,
      otherText: otherReason,
      API_BASE_URL,
    });
    if (result.success) {
      setModalReportVisible(false);
      setSelectedReason(null);
      setOtherReason('');
      navigation.navigate('ReportSuccessScreen');
    } else {
      ToastAndroid.show(result.message, ToastAndroid.SHORT);
    }
  };

  const handleSendMessage = () => {
    if (textMessage.trim().length === 0) {return;}
    const newMessage = {
      id: Date.now().toString(),
      from: 'me',
      type: 'text',
      data: textMessage.trim(),
      time: 'Now',
    };
    setMessageList([...messageList, newMessage]);
    setTextMessage('');
  };

  return (
    <View style={styles.content}>
      <StatusBar backgroundColor="#0A0F0D" />
      <View style={styles.appBar}>
        <View style={styles.container}>
          <IconButton icon={<ArrowLeftIcon />} onPress={() => navigation.goBack()} />
          <Image source={require('../../../../assets/image.png')} style={styles.avatar} />
          <Text style={styles.userInfo}>Max, 26</Text>
        </View>

        <View style={styles.container}>
          <IconButton icon={<VideoCameraIcon />} style={styles.button} />
          <IconButton icon={<Phone3Icon />} style={styles.button} />
          <View>
            <IconButton icon={<MoreIcon />} style={styles.button} onPress={() => setShowMenu(!showMenu)} />
            {showMenu && (
              <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem} onPress={handleReport}>
                  <InfoIcon width={16} height={16} />
                  <Text style={styles.menuItemText}>Report</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={handleBlock}>
                  <SlashIcon width={16} height={16} />
                  <Text style={styles.menuItemText}>Block</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.body}>
        {messageList.length === 0 ? (
          <Text style={styles.noChatText}>Start a new chat with Max.</Text>
        ) : (
          <FlatList
            data={messageList}
            renderItem={({ item }) => <Message message={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>

      <BlockModal
        visible={modalBlockVisible}
        onClose={() => setModalBlockVisible(false)}
        onConfirm={onConfirmBlock}
      />

      <ReportModal
        visible={modalReportVisible}
        onClose={() => setModalReportVisible(false)}
        reasons={reasons}
        selectedReason={selectedReason}
        onSelectReason={setSelectedReason}
        otherReason={otherReason}
        onChangeOtherReason={setOtherReason}
        onSubmit={onSubmitReport}
      />

      <View style={styles.footer}>
        <TextInput
          placeholder="Write message"
          placeholderTextColor="#6F6F6F"
          style={styles.input}
          value={textMessage}
          onChangeText={setTextMessage}
        />
        {textMessage.trim().length === 0 ? (
          <>
            <IconButton icon={<CameraIcon />} style={styles.button} />
            <IconButton icon={<MicrophoneIcon />} style={styles.button} />
          </>
        ) : (
          <IconButton icon={<SendIcon />} style={styles.button} onPress={handleSendMessage} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#0A0F0D',
    flex: 1,
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#0A0F0D',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#15412D',
    zIndex: 1,
    width: 140,
    height: 74,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'Roboto_400',
    color: '#FFFFFF',
    fontSize: 14,
    marginStart: 8,
  },
  appBar: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
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
  body: {
    flex: 1,
    paddingHorizontal: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  noChatText: {
    color: '#A0A0A0',
    fontFamily: 'Roboto',
    fontSize: 12,
    textAlign: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#6F6F6F',
    borderRadius: 8,
    color: '#FFFFFF',
  },
  button: {
    height: 40,
    width: 40,
  },
});

export default ChatScreen;
