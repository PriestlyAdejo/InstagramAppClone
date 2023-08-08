import { Pressable, Text, View } from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IVideoPlayer {
  uri: string;
  paused: boolean;
}

const VideoPlayer = ({ uri, paused }: IVideoPlayer) => {
  const [muted, setMuted] = useState(true);

  return (
    <View>
      <Video
        source={{ uri }}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted={muted}
        paused={paused}
      />
      <Pressable onPress={() => setMuted((v) => !v)} style={styles.muteButton}>
        <Ionicons
          name={muted ? 'volume-mute' : 'volume-medium'}
          size={24}
          color="white"
        />
      </Pressable>
    </View>
  );
};

export default VideoPlayer;
