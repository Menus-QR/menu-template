import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View, Dimensions } from 'react-native';
import { MenuItem } from '@/components/menu/MenuItem';
import { fetchMenuItems } from '@/services/menuService';
import { MenuFeedState } from '@/types/menu';

const { height } = Dimensions.get('window');

export function MenuFeed() {
  const [state, setState] = useState<MenuFeedState>({
    items: [],
    isLoading: true,
    error: null,
  });

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

  if (state.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={state.items}
      renderItem={({ item }) => <MenuItem item={item} />}
      keyExtractor={item => item.id}
      snapToInterval={height}
      snapToAlignment="start"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
