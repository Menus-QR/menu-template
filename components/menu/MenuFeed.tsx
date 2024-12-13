import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
  ViewStyle,
  Text,
  Platform,
  ViewToken,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchMenuItems } from '@/services/menuService';
import { MenuItem } from './MenuItem';
import { useMenuContext } from './MenuContext';
import { MenuItem as MenuItemType } from '@/types/menu';

// Get screen dimensions and adjust for mobile
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

// Use screen height for mobile and window height for web
const height = Platform.select({
  web: windowDimensions.height,
  default: screenDimensions.height,
});
const width = Platform.select({
  web: windowDimensions.width,
  default: screenDimensions.width,
});

interface ViewableItemsChanged {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function MenuFeed() {
  const { selectedVideoId } = useMenuContext();
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['menuItems'],
    queryFn: fetchMenuItems,
  });

  const viewabilityConfigCallbackPairs = React.useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 300,
      },
      onViewableItemsChanged: ({ changed }: ViewableItemsChanged) => {
        const firstVisible = changed.find(item => item.isViewable);
        if (firstVisible) {
          console.log('visible item:', firstVisible);
          setVisibleIndex(firstVisible.index ?? 0);
        }
      },
    },
  ]);

  useEffect(() => {
    const scrollToIndex = () => {
      if (selectedVideoId && flatListRef.current) {
        const index = items.findIndex(item => item.id === selectedVideoId);
        if (index !== -1 && index < items.length) {
          console.log('Scrolling to index:', index);
          flatListRef.current.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0,
          });
        } else {
          console.warn('Selected video ID not found in items:', selectedVideoId);
        }
      }
    };

    const debounceScroll = setTimeout(scrollToIndex, 100);
    return () => clearTimeout(debounceScroll);
  }, [selectedVideoId, items]);

  const renderItem = useCallback(
    ({ item, index }: { item: MenuItemType; index: number }) => (
      <MenuItem
        item={item}
        isVisible={index === visibleIndex}
        hasUserInteracted={hasUserInteracted}
        allItems={items}
      />
    ),
    [visibleIndex, hasUserInteracted, items]
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load menu items</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate={Platform.select({ ios: 'fast', default: 'fast' })}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        windowSize={2}
        maxToRenderPerBatch={1}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        onScrollBeginDrag={() => setHasUserInteracted(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
