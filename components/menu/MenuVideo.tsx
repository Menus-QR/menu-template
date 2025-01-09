import { Video, ResizeMode } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Dimensions, Platform } from 'react-native';

interface MenuVideoProps {
  url: string;
  isVisible: boolean;
  hasUserInteracted?: boolean;
  index: string;
}

export function MenuVideo({ url, isVisible, hasUserInteracted = false, index }: MenuVideoProps) {
  const video = useRef<Video | null>(null);
  const [status, setStatus] = useState<any>(null);
  const wasVisible = useRef(isVisible);

  // Handle video playback based on visibility and user interaction
  useEffect(() => {
    let isMounted = true;

    async function handlePlayback() {
      const player = video.current;
      if (!player || !isMounted) return;

      try {
        // Video becomes visible
        console.log('index:', index);

        if (isVisible && hasUserInteracted) {
          console.log('Playing video at index:');
          await player.setIsMutedAsync(true);
          // Small delay to ensure proper loading
          setTimeout(async () => {
            if (isMounted && player) {
              await player.playAsync();
            }
          }, 100);
        }
        // Video becomes hidden
        else if (wasVisible.current && !isVisible) {
          console.log('Pausing video as we scroll away from:', index);
          await player.pauseAsync();
          await player.setPositionAsync(0);
        }

        // When a video becomes visible (we scroll to it)
        else if (!wasVisible.current && isVisible) {
          console.log('Playing video as we scroll to:', index);
          await player.playAsync();
        }

        // Update wasVisible for the next intersection check
        wasVisible.current = isVisible;
      } catch (error) {
        console.warn('Playback error:', error);
      }
    }

    handlePlayback();
    return () => {
      isMounted = false;
    };
  }, [isVisible, hasUserInteracted]);

  // Cleanup effect to pause and reset video when component unmounts
  useEffect(() => {
    return () => {
      const player = video.current;
      if (player) {
        player.pauseAsync();
        player.setPositionAsync(0);
      }
    };
  }, []);

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
          shouldPlay={true}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          onLoad={() => {
            console.log('loaded');
            const player = video.current;
            if (!player) return;

            // if (status?.isPlaying) {
            //   player.pauseAsync();
            // } else {
            //   player.playAsync();
            // }

            if (isVisible && hasUserInteracted) {
              player.playAsync();
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
