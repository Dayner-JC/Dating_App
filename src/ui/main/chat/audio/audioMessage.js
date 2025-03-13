import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Waveform, PlayerState } from '@simform_solutions/react-native-audio-waveform';
import PlayIcon from '../../../../assets/icons/play.svg';
import { getAudio } from './getAudio';

const AudioMessage = ({ uri }) => {
  const ref = useRef(null);
  const [audioPath, setAudioPath] = useState(null);
  const [downloading, setDownloading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [playerState, setPlayerState] = useState(PlayerState.stopped);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAudio({ uri });
        if (result) {setAudioPath(result);}
      } catch (err) {
        console.error('Error loading audio:', err);
      } finally {
        setDownloading(false);
      }
    };
    fetchData();
  }, [uri]);

  if (downloading || loading || !audioPath) {
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

const styles = StyleSheet.create({
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
      },
      waveformContainer: {
        flex: 1,
        marginHorizontal: 10,
      },
      audioDuration: {
        color: '#FFFFFF',
      },
});

export default AudioMessage;
