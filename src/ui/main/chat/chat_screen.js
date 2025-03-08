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
} from 'react-native';
import ChatAppBar from '../appBars/chat_appBar';
import IconButton from '../../components/icon_button';
import PlayIcon from '../../../assets/icons/play.svg';
import CameraIcon from '../../../assets/icons/camera.svg';
import MicrophoneIcon from '../../../assets/icons/microphone.svg';
import Button from '../../components/button';
import CloseIcon from '../../../assets/icons/close.svg';
import SlashIcon from '../../../assets/icons/slash.svg';
import {
  Waveform,
  IWaveformRef,
  PlayerState,
} from '@simform_solutions/react-native-audio-waveform';
import RNFS from 'react-native-fs';
import React, {useEffect, useRef, useState} from 'react';
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

  // If file already exists, return its path
  if (await RNFS.exists(destinationPath)) {
    return destinationPath;
  }

  console.log(`Downloading ${uri}`);

  try {
    const response = RNFS.downloadFile({
      fromUrl: uri,
      toFile: destinationPath,
      progress: progress => {
        console.log('Download progress:', progress);
      },
    });

    await response.promise;

    console.log('FILE DOWNLOAD SUCCESS:', destinationPath);
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

  // const handlePlayPauseAction = async () => {
  //   // If we are recording do nothing
  //   if (
  //     currentPlayingRef?.current?.currentState === RecorderState.recording
  //   ) {
  //     return;
  //   }

  //   const startNewPlayer = async () => {
  //     currentPlayingRef = ref;
  //     if (ref.current?.currentState === PlayerState.paused) {
  //       await ref.current?.resumePlayer();
  //     } else {
  //       await ref.current?.startPlayer({
  //         finishMode: FinishMode.stop,
  //       });
  //     }
  //   };

  //   // If no player or if current player is stopped just start the new player!
  //   if (
  //     currentPlayingRef == null ||
  //     [PlayerState.stopped, PlayerState.paused].includes(
  //       currentPlayingRef?.current?.currentState as PlayerState
  //     )
  //   ) {
  //     await startNewPlayer();
  //   } else {
  //     // Pause current player if it was playing
  //     if (currentPlayingRef?.current?.currentState === PlayerState.playing) {
  //       await currentPlayingRef?.current?.pausePlayer();
  //     }

  //     // Start player when it is a different one!
  //     if (currentPlayingRef?.current?.playerKey !== ref?.current?.playerKey) {
  //       await startNewPlayer();
  //     }
  //   }
  // };

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
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
      <PlayIcon />
      <View style={{flex: 1}}>
        <Waveform
          mode="static"
          path={audioPath}
          candleSpace={4}
          candleWidth={4}
          candleHeightScale={10}
          scrubColor="white"
        />
      </View>
      <Text style={{color: '#FFFFFF'}}>0:08</Text>
    </View>
  );
};

const Message = ({message}) => {
  if (message.from == 'other') {
    return (
      <View style={{flexDirection: 'row', gap: 10}}>
        <Image
          source={require('../../../assets/image.png')}
          style={styles.avatar}
        />
        <View style={{flexDirection: 'column', gap: 5}}>
          {message.type == 'text' && (
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#15412D',
                padding: 10,
                maxWidth: '80%',
              }}>
              <Text style={styles.messageText}>{message.data}</Text>
            </View>
          )}
          {message.type == 'photo' && (
            <Image
              source={require('../../../assets/image-2.jpeg')}
              style={styles.messageImage}
            />
          )}
          {message.type == 'audio' && (
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#15412D',
                padding: 10,
                maxWidth: '80%',
              }}>
              <AudioMessage uri={message.data} />
            </View>
          )}
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{flexDirection: 'column', gap: 5, alignItems: 'flex-end'}}>
        {message.type == 'text' && (
          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#2B2B2B',
              padding: 10,
              maxWidth: '80%',
            }}>
            <Text style={styles.messageText}>{message.data}</Text>
          </View>
        )}
        {message.type == 'photo' && (
          <Image
            source={require('../../../assets/image-2.jpeg')}
            style={styles.messageImage}
          />
        )}
        {message.type == 'audio' && (
          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#2B2B2B',
              padding: 10,
              width: 200,
            }}>
            <AudioMessage uri={message.data} />
          </View>
        )}

        <Text style={styles.messageTime}>{message.time}</Text>
      </View>
    );
  }
};

const ChatScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const uid = getCurrentUserUID();

  const handleBlockUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/block_unblock/block`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({uid: uid, targetUid: 'mock-3'}),
      });

      if (response.ok) {
        setModalVisible(false);
        ToastAndroid.show('User successfully blocked', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Sorry, some error has occurred', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Sorry, some error has occurred', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.content}>
      <ChatAppBar />
      <View style={styles.body}>
        {messages.length === 0 ? (
          <Text style={styles.noChatText}>Start a new chat with Max.</Text>
        ) : (
          <FlatList
            data={messages}
            renderItem={({item}) => <Message message={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{gap: 20}}
          />
        )}
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.dialogBox}>
            <View style={styles.dialogBar}>
              <CloseIcon onPress={() => setModalVisible(false)} />
            </View>
            <SlashIcon />
            <Text style={styles.modal_title}>Block User</Text>
            <Text style={styles.message}>
              Are you sure you want to block this user?{'\n'}
              This user will no longer be able to message you or view your
              profile.
            </Text>
            <Button
              title={'Confirm Block'}
              fontFamily="Roboto_500"
              backgroundColor="#C3313C"
              fontSize={14}
              height={48}
              width={302}
              borderRadius={100}
              onPress={handleBlockUser}
            />
            <Button
              title={'No, cancel'}
              fontFamily="Roboto_400"
              backgroundColor="#17261E"
              borderWidth={1}
              borderColor="#747474"
              marginTop={12}
              fontSize={14}
              height={48}
              width={302}
              borderRadius={100}
              onPress={() => setModalVisible(false)}
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
    flexDirection: 'column',
    flex: 1,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  noChatText: {
    color: '#A0A0A0',
    fontFamily: 'Roboto',
    fontSize: 12,
    textAlign: 'center',
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
  buttonImage: {
    height: 22,
    width: 22,
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageFromOther: {
    flexDirection: 'column',
    width: '50%',
  },
  messageFromMe: {
    width: '50%',
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
    marginBottom: 10,
    marginTop: 5,
  },
  message: {
    fontFamily: 'Roboto_400',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ChatScreen;
