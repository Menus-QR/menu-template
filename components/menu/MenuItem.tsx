import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { MenuItem as MenuItemType } from '@/types/menu';
import { MenuItemDetails } from './MenuItemDetails';
import { MenuVideo } from './MenuVideo';
import { FullMenu } from './FullMenu';
import { useMenuContext } from './MenuContext';

interface MenuItemProps {
  item: MenuItemType;
  index: number;
  allItems: MenuItemType[];
}

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const height = Platform.select({
  web: windowDimensions.height,
  default: screenDimensions.height,
});
const width = Platform.select({
  web: windowDimensions.width,
  default: screenDimensions.width,
});

export function MenuItem({ item, index, allItems }: MenuItemProps) {
  const { visibleVideoIndex } = useMenuContext();
  const isVisible = index === visibleVideoIndex;

  return (
    <View style={styles.container}>
      <MenuVideo url={item.video_url} isVisible={isVisible} />
      <View style={styles.detailsContainer}>
        <MenuItemDetails item={item} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '#000',
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
