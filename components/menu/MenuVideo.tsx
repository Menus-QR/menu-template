import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

interface MenuVideoProps {
  url: string;
  isVisible: boolean;
}

export function MenuVideo({ url, isVisible }: MenuVideoProps) {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>();
  const wasVisible = useRef(isVisible);

  // Handle visibility changes
  useEffect(() => {
    const player = video.current;
    if (!player) return;

    async function handleVisibilityChange() {
      if (!video.current) return;

      try {
        if (isVisible) {
          await video.current.setPositionAsync(0);
          await video.current.playAsync();
        } else if (wasVisible.current) {
          await video.current.pauseAsync();
        }
      } catch (error) {
        console.warn('Video playback error:', error);
      }
    }

    handleVisibilityChange();
    wasVisible.current = isVisible;
  }, [isVisible]);

  return (
    <Pressable
      onPress={() => {
        const player = video.current;
        if (!player) return;

        if (status?.isPlaying) {
          player.pauseAsync();
        } else {
          player.playAsync();
        }
      }}
    >
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          source={{ uri: url }}
          style={styles.video}
          isLooping={true}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isMuted={true}
          shouldPlay={isVisible}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          onLoad={() => {
            console.log('loaded');
            const player = video.current;
            if (!player) return;

            if (isVisible) {
              player.playAsync();
            } else {
              player.pauseAsync();
            }
          }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    width: Dimensions.get('window').width,
    aspectRatio: 16 / 9,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
