import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View, Dimensions, ViewStyle } from 'react-native';
import { MenuItem } from '@/components/menu/MenuItem';
import { fetchMenuItems } from '@/services/menuService';
import { MenuFeedState } from '@/types/menu';

const { height } = Dimensions.get('window');

interface ScrollEvent {
  nativeEvent: {
    contentOffset: {
      y: number;
    };
  };
}

export function MenuFeed() {
  const [state, setState] = useState<MenuFeedState>({
    items: [],
    isLoading: true,
    error: null,
  });
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const items = await fetchMenuItems();
      setState({
        items,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: 'Failed to load menu items',
      }));
    }
  };

  const onScrollEnd = (event: ScrollEvent) => {
    const offset = event.nativeEvent.contentOffset.y;
    const index = Math.round(offset / height);

    flatListRef.current?.scrollToOffset({
      offset: index * height,
      animated: true,
    });
  };

  if (state.isLoading) {
    return (
      <View style={styles.loadingContainer as ViewStyle}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container as ViewStyle}>
      <FlatList
        ref={flatListRef}
        data={state.items}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={item => item.id}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate={0.95}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        pagingEnabled={true}
        style={styles.flatList as ViewStyle}
        contentContainerStyle={styles.contentContainer as ViewStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
  },
  contentContainer: {
    minHeight: height,
  },
});
