import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
  Platform,
  ViewToken,
  Text,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchCategorizedMenuItems } from '@/services/menuService';
import { MenuItem } from './MenuItem';
import { useMenuContext } from './MenuContext';
import { MenuItem as MenuItemType } from '@/types/menu';
import { MenuHeader } from './MenuHeader';

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

const viewabilityConfig = {
  itemVisiblePercentThreshold: 60, // Item must be 60% visible
  minimumViewTime: 200, // Must be visible for at least 200ms
  waitForInteraction: false, // Don't wait for user interaction
};

export function MenuFeed() {
  const { selectedVideoId } = useMenuContext();
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const {
    data: categoryGroups = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categorizedMenuItems'],
    queryFn: fetchCategorizedMenuItems,
  });

  // Flatten the categorized items for rendering
  const flattenedItems = categoryGroups.flatMap(group => group.items);

  // Create a map of category to first item index
  const categoryIndexMap = useCallback(() => {
    const map = new Map<string, number>();
    let currentIndex = 0;

    categoryGroups.forEach(group => {
      map.set(group.category.category, currentIndex);
      currentIndex += group.items.length;
    });

    return map;
  }, [categoryGroups]);

  const handleCategoryPress = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      const indexMap = categoryIndexMap();
      const index = indexMap.get(category);

      if (index !== undefined && flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0,
        });
      }
    },
    [categoryIndexMap]
  );

  const viewabilityConfigCallbackPairs = React.useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged: ({ viewableItems }: ViewableItemsChanged) => {
        const visibleItem = viewableItems[0];
        if (visibleItem) {
          console.log('Visible item index:', visibleItem.index);
          setVisibleIndex(visibleItem.index ?? 0);
        }
      },
    },
  ]);

  useEffect(() => {
    const scrollToIndex = () => {
      if (selectedVideoId && flatListRef.current) {
        const index = flattenedItems.findIndex(item => item.id === selectedVideoId);
        if (index !== -1 && index < flattenedItems.length) {
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
  }, [selectedVideoId, flattenedItems]);

  const renderItem = useCallback(
    ({ item, index }: { item: MenuItemType; index: number }) => (
      <MenuItem
        item={item}
        isVisible={index === visibleIndex}
        hasUserInteracted={hasUserInteracted}
      />
    ),
    [visibleIndex, hasUserInteracted, flattenedItems]
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
      <MenuHeader onCategoryPress={handleCategoryPress} selectedCategory={selectedCategory} />
      <FlatList
        ref={flatListRef}
        data={flattenedItems}
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
        onScrollToIndexFailed={info => {
          console.warn('Failed to scroll to index', info);
        }}
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
