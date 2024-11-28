import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuItem } from '@/types/menu';

interface MenuItemDetailsProps {
  item: MenuItem;
}

export function MenuItemDetails({ item }: MenuItemDetailsProps) {
  const insets = useSafeAreaInsets();

  // Add extra padding for the tab bar (typical tab bar height is 49)
  const TAB_BAR_HEIGHT = 49;

  return (
    <View
      style={[
        styles.overlay,
        {
          // Add tab bar height to the bottom padding
          paddingBottom: Math.max(insets.bottom + TAB_BAR_HEIGHT + 20, TAB_BAR_HEIGHT + 20),
        },
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    // Enhanced gradient effect
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  price: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
