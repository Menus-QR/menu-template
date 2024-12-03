import { Video, ResizeMode } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Dimensions, Platform } from 'react-native';

interface MenuVideoProps {
  url: string;
  isVisible: boolean;
  hasUserInteracted?: boolean;
}

export function MenuVideo({ url, isVisible, hasUserInteracted = false }: MenuVideoProps) {
  const video = useRef<Video | null>(null);
  const [status, setStatus] = useState<any>(null);

  // Handle video playback based on visibility and user interaction
  useEffect(() => {
    async function handlePlayback() {
      const player = video.current;
      if (!player) return;

      try {
        if (isVisible && hasUserInteracted) {
          await player.setIsMutedAsync(true);
          await player.playAsync();
        } else {
          await player.pauseAsync();
          await player.setPositionAsync(0);
        }
      } catch (error) {
        console.warn('Playback error:', error);
      }
    }

    handlePlayback();
  }, [isVisible, hasUserInteracted]);

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
          isLooping
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={false}
          isMuted={true}
          shouldPlay={false}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          {...Platform.select({
            web: {
              playsInline: true,
              'webkit-playsinline': true,
            },
            default: {},
          })}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
