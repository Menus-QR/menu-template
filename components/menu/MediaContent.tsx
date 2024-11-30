import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { MediaContentProps, MediaType } from '@/types/menu';
import { refreshVideoUrl } from '@/services/menuService';
import { VideoView, useVideoPlayer } from 'expo-video';

function getMediaType(url: string): MediaType {
  const videoExtensions = ['.mp4', '.webm', '.mov'];
  const isVideo = videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
  console.log('Media type detection:', { url, isVideo });
  return isVideo ? 'video' : 'image';
}

export function MediaContent({
  url,
  isVisible,
  preload,
  onLoadStart,
  onLoadEnd,
  onError,
}: MediaContentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const mediaType = getMediaType(url);

  // Create video player instance
  const player = useVideoPlayer(mediaType === 'video' ? currentUrl : null, player => {
    player.loop = true;
    player.muted = true;
  });

  // Handle URL changes
  useEffect(() => {
    console.log('URL changed:', { url, mediaType: getMediaType(url) });
    setCurrentUrl(url);
  }, [url]);

  // Handle loading state changes
  useEffect(() => {
    console.log('Loading state changed:', { isLoading, hasError, isVisible });
  }, [isLoading, hasError, isVisible]);

  // Handle initial load
  useEffect(() => {
    onLoadStart?.();
    setIsLoading(true);
    setHasError(false);
  }, [currentUrl, onLoadStart]);

  // Handle video visibility
  useEffect(() => {
    if (mediaType === 'video') {
      if (isVisible) {
        player.play().catch(error => {
          console.error('Error playing video:', error);
        });
      } else {
        player.pause();
        if (!preload) {
          player.currentTime = 0;
        }
      }
    }
  }, [isVisible, preload, player, mediaType]);

  // Set up event listeners for the video player
  useEffect(() => {
    if (mediaType === 'video') {
      const statusSubscription = player.addListener('statusChange', ({ status, error }) => {
        console.log('Video status changed:', status);
        if (status === 'readyToPlay') {
          setIsLoading(false);
          onLoadEnd?.();
        } else if (status === 'error' && error) {
          console.error('Video error:', error);
          handleError();
        }
      });

      return () => {
        statusSubscription.remove();
      };
    }
  }, [player, mediaType, onLoadEnd]);

  const handleError = async () => {
    console.error('Media error occurred:', {
      url: currentUrl,
      mediaType,
    });

    if (mediaType === 'video') {
      try {
        const pathMatch = url.match(/videos\/([^?]+)/);
        console.log('Attempting to extract video path:', { url, pathMatch });

        if (pathMatch) {
          console.log('Refreshing video URL for path:', pathMatch[1]);
          const newUrl = await refreshVideoUrl(pathMatch[1]);
          console.log('Got new URL:', newUrl.substring(0, 100) + '...');
          setCurrentUrl(newUrl);
          return;
        }
      } catch (refreshError) {
        console.error('Failed to refresh video URL:', refreshError);
      }
    }

    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (mediaType === 'video') {
    return (
      <View style={styles.container}>
        <VideoView style={styles.media} player={player} nativeControls={false} contentFit="cover" />
        {renderLoadingAndError()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: url }}
        style={styles.media}
        resizeMode="cover"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => {
          setIsLoading(false);
          onLoadEnd?.();
        }}
        onError={handleError}
      />
      {renderLoadingAndError()}
    </View>
  );

  function renderLoadingAndError() {
    return (
      <>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
        {hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load media</Text>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
