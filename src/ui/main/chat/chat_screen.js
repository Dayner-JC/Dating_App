import {StyleSheet, Text, TextInput, View} from 'react-native';
import ChatAppBar from '../appBars/chat_appBar';
import IconButton from '../../components/icon_button';
import CameraIcon from "../../../assets/icons/camera.svg"
import MicrophoneIcon from "../../../assets/icons/microphone.svg"


const ChatScreen = () => {
  return (
    <View style={styles.content}>
      <ChatAppBar />
      <View style={styles.body}>
        <Text style={styles.text}>Start a new chat with Max.</Text>
      </View>
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
    alignItems: 'center', // Center text horizontally within the column
  },
  text: {
    color: '#A0A0A0',
    fontFamily: 'Roboto',
    fontSize: 12,
    textAlign: 'center',
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
});

export default ChatScreen;
