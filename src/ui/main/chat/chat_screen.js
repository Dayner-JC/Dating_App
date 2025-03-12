import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconButton from '../../components/icon_button';
import Button from '../../components/button';
import CloseIcon from '../../../assets/icons/close.svg';
import SlashIcon from '../../../assets/icons/slash.svg';
import InfoIcon from '../../../assets/icons/info-circle.svg';
import CameraIcon from '../../../assets/icons/camera.svg';
import MicrophoneIcon from '../../../assets/icons/microphone.svg';
import PlayIcon from '../../../assets/icons/play.svg';
import ArrowLeftIcon from '../../../assets/icons/arrow-left.svg';
import MoreIcon from '../../../assets/icons/more.svg';
import Phone3Icon from '../../../assets/icons/phone-3.svg';
import VideoCameraIcon from '../../../assets/icons/video-camera.svg';
import {
  Waveform,
  IWaveformRef,
  PlayerState,
} from '@simform_solutions/react-native-audio-waveform';
import RNFS from 'react-native-fs';
import {getCurrentUserUID} from '../../../infrastructure/uid/uid';
import API_BASE_URL from '../../../config/config';

const messages = [
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

const getAudio = async ({uri}) => {
  const arr = uri.split('/');
  const filename = arr[arr.length - 1];
  const destinationPath = `${RNFS.DocumentDirectoryPath}/${filename}`;

  if (await RNFS.exists(destinationPath)) {
    return destinationPath;
  }

  try {
    const response = RNFS.downloadFile({
      fromUrl: uri,
      toFile: destinationPath,
      progress: progress => {
        console.log('Download progress:', progress);
      },
    });
    await response.promise;
    return destinationPath;
  } catch (error) {
    console.error('FILE DOWNLOAD FAILED:', error);
    return null;
  }
};

const AudioMessage = ({uri}) => {
  const ref = useRef < IWaveformRef > null;
  const [audioPath, setAudioPath] = useState(null);
  const [downloading, setDownloading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [playerState, setPlayerState] = useState(PlayerState.stopped);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAudio({uri});
        if (result) {
          setAudioPath(result);
        }
      } catch (err) {
        console.error('Error loading audio:', err);
      } finally {
        setDownloading(false);
      }
    };
    fetchData();
  }, [uri]);

  if (downloading || loading || audioPath == null) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.audioContainer}>
      <PlayIcon />
      <View style={styles.waveformContainer}>
        <Waveform
          mode="static"
          path={audioPath}
          candleSpace={4}
          candleWidth={4}
          candleHeightScale={10}
          scrubColor="white"
        />
      </View>
      <Text style={styles.audioDuration}>0:08</Text>
    </View>
  );
};

const Message = ({message}) => {
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

const ChatScreen = () => {
  const navigation = useNavigation();
  const [modalBlockVisible, setModalBlockVisible] = useState(false);
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [otherReason, setOtherReason] = useState('');
  const uid = getCurrentUserUID();

  const [showMenu, setShowMenu] = useState(false);

  const handleReport = () => {
    setShowMenu(false);
    setModalReportVisible(true);
  };

  const handleBlock = () => {
    setShowMenu(false);
    setModalBlockVisible(true);
  };

  const reasons = [
    {id: 'Inappropriate messages', label: 'Inappropriate messages'},
    {id: 'Suspicious behavior', label: 'Suspicious behavior'},
    {id: 'Spam or unwanted content', label: 'Spam or unwanted content'},
    {id: 'Other', label: 'Other'},
  ];

  const handleBlockUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/block_unblock_report/block`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uid: uid, targetUid: 'mock-3'}),
      });

      if (response.ok) {
        setModalBlockVisible(false);
        ToastAndroid.show('User successfully blocked', ToastAndroid.SHORT);
        navigation.navigate('BlockSuccessScreen');
      } else {
        ToastAndroid.show('Sorry, some error has occurred', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Sorry, some error has occurred', ToastAndroid.SHORT);
    }
  };

const handleSubmitReport = async () => {

  const reportData = {
    reporterUid: uid,
    reportedUid: 'mock-1',
    reason: selectedReason,
    otherText: selectedReason === 'Other' ? otherReason : null,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/user/block_unblock_report/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      const { message } = await response.json();
      ToastAndroid.show(message || 'Error sending the report.', ToastAndroid.SHORT);
      return;
    }

    setModalReportVisible(false);
    setSelectedReason(null);
    setOtherReason('');
    navigation.navigate('ReportSuccessScreen');
  } catch (error) {
    ToastAndroid.show('An error occurred while submitting the report.', ToastAndroid.SHORT);
    console.error('Error:', error);
  }
};

  const handleReasonSelect = reasonId => {
    setSelectedReason(reasonId);
  };

  return (
    <View style={styles.content}>
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
        <Text style={styles.userInfo}>Max, 26</Text>
      </View>

      <View style={styles.container}>
        <IconButton icon={<VideoCameraIcon />} style={styles.button} />
        <IconButton icon={<Phone3Icon />} style={styles.button} />

        <View>
          <IconButton
            icon={<MoreIcon />}
            style={styles.button}
            onPress={() => setShowMenu(!showMenu)}
          />

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
        {messages.length === 0 ? (
          <Text style={styles.noChatText}>Start a new chat with Max.</Text>
        ) : (
          <FlatList
            data={messages}
            renderItem={({item}) => <Message message={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={modalBlockVisible}
        onRequestClose={() => setModalBlockVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.dialogBox}>
            <View style={styles.dialogBar}>
              <CloseIcon onPress={() => setModalBlockVisible(false)} />
            </View>
            <SlashIcon />
            <Text style={styles.modal_title}>Block User</Text>
            <Text style={styles.messageTextModal}>
              Are you sure you want to block this user?{'\n'}This user will no
              longer be able to message you or view your profile.
            </Text>
            <Button
              title="Confirm Block"
              fontFamily="Roboto_500"
              backgroundColor="#C3313C"
              fontSize={14}
              height={48}
              width={302}
              borderRadius={100}
              onPress={handleBlockUser}
            />
            <Button
              title="No, cancel"
              fontFamily="Roboto_400"
              backgroundColor="#17261E"
              borderWidth={1}
              borderColor="#747474"
              marginTop={12}
              fontSize={14}
              height={48}
              width={302}
              borderRadius={100}
              onPress={() => setModalBlockVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={modalReportVisible}
        onRequestClose={() => setModalReportVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.dialogReportBox}>
            <View style={styles.dialogBar}>
              <CloseIcon onPress={() => setModalReportVisible(false)} />
            </View>
            <InfoIcon />
            <Text style={styles.modal_title}>Report User</Text>
            <Text style={styles.messageTextModal}>
              Why do you want to report this user?{'\n'}Please select a reason.
            </Text>
            <View style={styles.option_container}>
              {reasons.map(reason => (
                <TouchableOpacity
                  key={reason.id}
                  style={[
                    styles.reasonOption,
                    selectedReason === reason.id && styles.selectedOption,
                  ]}
                  onPress={() => handleReasonSelect(reason.id)}>
                  <Text
                    style={[
                      styles.reasonText,
                      selectedReason === reason.id && styles.selectedText,
                    ]}>
                    {reason.label}
                  </Text>
                  <View
                    style={[
                      styles.circle,
                      selectedReason === reason.id && styles.selectedCircle,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
            {selectedReason === 'Other' && (
              <TextInput
                style={styles.otherInput}
                placeholder="Describe the reason..."
                placeholderTextColor="#6F6F6F"
                multiline
                value={otherReason}
                onChangeText={setOtherReason}
              />
            )}
            <Button
              title="Submit Report"
              fontFamily="Roboto_500"
              backgroundColor="#C3313C"
              disabledBackgroundColor="rgba(195, 49, 60, 1)"
              disabledTextColor="#a2a8a5"
              fontSize={14}
              height={48}
              width={302}
              borderRadius={100}
              onPress={handleSubmitReport}
              disabled={
                selectedReason === 'Other'
                  ? otherReason.trim().length < 20
                  : !selectedReason
              }
            />
            <Button
              title="No, cancel"
              fontFamily="Roboto_400"
              backgroundColor="#17261E"
              borderWidth={1}
              borderColor="#747474"
              marginTop={12}
              fontSize={14}
              height={48}
              width={302}
              borderRadius={100}
              onPress={() => setModalReportVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <TextInput
          placeholder="Write message"
          placeholderTextColor="#6F6F6F"
          style={styles.input}
        />
        <IconButton icon={<CameraIcon />} style={styles.button} />
        <IconButton icon={<MicrophoneIcon />} style={styles.button} />
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
    backgroundColor: '#15412D',
    padding: 10,
    maxWidth: '80%',
  },
  messageBubbleMe: {
    borderRadius: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0F0DE5',
  },
  dialogBox: {
    width: 350,
    height: 372,
    backgroundColor: '#17261E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#21362C',
  },
  dialogReportBox: {
    width: 350,
    backgroundColor: '#17261E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#21362C',
  },
  dialogBar: {
    height: 36,
    alignItems: 'flex-end',
    backgroundColor: '#17261F',
    width: '100%',
    paddingStart: 10,
  },
  modal_title: {
    fontFamily: 'Roboto_500',
    fontSize: 22,
    color: '#FFFFFF',
    marginVertical: 5,
    textAlign: 'center',
  },
  messageTextModal: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  option_container: {
    marginBottom: 20,
    width: '100%',
  },
  reasonOption: {
    flexDirection: 'row',
    backgroundColor: '#5258531A',
    borderColor: '#525853',
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    height: 56,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  selectedOption: {
    backgroundColor: '#3A341B',
    borderColor: '#D97904',
  },
  reasonText: {
    color: '#D9D2B0',
    fontSize: 16,
    fontFamily: 'Roboto_400',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#DADADA',
    borderRadius: 4,
  },
  selectedCircle: {
    borderWidth: 3.5,
    backgroundColor: '#FFFFFF',
    borderColor: '#D97904',
  },
  otherInput: {
    height: 80,
    borderWidth: 1,
    borderColor: '#747474',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#FFFFFF',
    textAlignVertical: 'top',
    marginBottom: 20,
    width: 302,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waveformContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  audioDuration: {
    color: '#FFFFFF',
  },
});

export default ChatScreen;
