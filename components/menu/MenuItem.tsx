import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { MenuItem as MenuItemType } from '@/types/menu';
import { MenuItemDetails } from './MenuItemDetails';
import { MenuVideo } from './MenuVideo';
import { FullMenu } from './FullMenu';

interface MenuItemProps {
  item: MenuItemType;
  isVisible: boolean;
  hasUserInteracted: boolean;
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

export function MenuItem({ item, isVisible, hasUserInteracted, allItems }: MenuItemProps) {
  return (
    <View style={styles.container}>
      <MenuVideo url={item.url} isVisible={isVisible} hasUserInteracted={hasUserInteracted} />
      <FullMenu items={allItems} />
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
