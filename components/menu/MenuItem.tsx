import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MenuItem as MenuItemType } from '@/types/menu';
import { MenuItemDetails } from './MenuItemDetails';
import { MediaContent } from './MediaContent';

interface MenuItemProps {
  item: MenuItemType;
  isVisible: boolean;
  preload: boolean;
}

const { height, width } = Dimensions.get('window');

export function MenuItem({ item, isVisible, preload }: MenuItemProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  console.log('url', item.url);

  return (
    <View style={styles.container}>
      <MediaContent
        url={item.url}
        isVisible={isVisible}
        preload={preload}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      <View style={styles.detailsContainer}>
        <MenuItemDetails item={item} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#000',
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
