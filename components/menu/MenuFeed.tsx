import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
  ViewStyle,
  Text,
} from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MenuItem } from '@/components/menu/MenuItem';
import { fetchMenuItems, prefetchVideo } from '@/services/menuService';
import { MenuItem as MenuItemType } from '@/types/menu';

const { height } = Dimensions.get('window');
const VIEWABILITY_CONFIG = {
  itemVisiblePercentThreshold: 80,
  minimumViewTime: 300,
};

interface ScrollEvent {
  nativeEvent: {
    contentOffset: {
      y: number;
    };
  };
}

interface ViewableItem {
  item: MenuItemType;
  index: number | null;
  isViewable: boolean;
  key: string;
}

interface ViewableItemsChanged {
  viewableItems: ViewableItem[];
  changed: ViewableItem[];
}

export function MenuFeed() {
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['menuItems'],
    queryFn: fetchMenuItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
    onError: error => {
      console.error('Query error:', error);
    },
  });

  useEffect(() => {
    console.log('MenuFeed state:', {
      itemsCount: items.length,
      isLoading,
      error,
    });
  }, [items, isLoading, error]);

  const prefetchNextItems = useCallback(
    async (currentIndex: number) => {
      const nextItems = items.slice(currentIndex + 1, currentIndex + 6);
      const videoItems = nextItems.filter(item => item.url.match(/\.(mp4|webm|mov)$/i));

      queryClient.prefetchQuery({
        queryKey: ['menuItems', currentIndex + 1],
        queryFn: () => fetchMenuItems(),
      });

      for (const item of videoItems) {
        await prefetchVideo(item.url);
      }
    },
    [items, queryClient]
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewableItem[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        const newIndex = viewableItems[0].index;
        setVisibleIndex(newIndex);
        prefetchNextItems(newIndex);
      }
    },
    [prefetchNextItems]
  );

  const onScrollEnd = (event: ScrollEvent) => {
    const offset = event.nativeEvent.contentOffset.y;
    const index = Math.round(offset / height);

    flatListRef.current?.scrollToOffset({
      offset: index * height,
      animated: true,
    });
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: VIEWABILITY_CONFIG,
      onViewableItemsChanged: onViewableItemsChanged,
    },
  ]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer as ViewStyle}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  console.log(error);

  if (error) {
    return (
      <View style={styles.loadingContainer as ViewStyle}>
        <Text style={styles.errorText}>Failed to load menu items</Text>
      </View>
    );
  }

  return (
    <View style={styles.container as ViewStyle}>
      <FlatList
        ref={flatListRef}
        data={items}
        renderItem={({ item, index }) => (
          <MenuItem
            item={item}
            isVisible={index === visibleIndex}
            preload={Math.abs(index - visibleIndex) <= 1}
          />
        )}
        keyExtractor={item => item.id}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate={0.95}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        pagingEnabled={true}
        style={styles.flatList as ViewStyle}
        contentContainerStyle={styles.contentContainer as ViewStyle}
        removeClippedSubviews={true}
        maxToRenderPerBatch={3}
        windowSize={5}
        initialNumToRender={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  flatList: {
    flex: 1,
  },
  contentContainer: {
    minHeight: height,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
