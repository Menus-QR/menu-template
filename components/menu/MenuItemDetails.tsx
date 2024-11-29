import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuItem } from '@/types/menu';
import { DESCRIPTION_CHARACTER_LIMIT, TAB_BAR_HEIGHT } from '@/constants/layout';
import { LinearGradient } from 'expo-linear-gradient';

interface MenuItemDetailsProps {
  item: MenuItem;
}

function shouldTruncate(text: string): boolean {
  return text.length > DESCRIPTION_CHARACTER_LIMIT;
}

function truncateText(text: string): string {
  return text.slice(0, DESCRIPTION_CHARACTER_LIMIT).trim() + '...';
}

export function MenuItemDetails({ item }: MenuItemDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const insets = useSafeAreaInsets();

  const needsTruncation = shouldTruncate(item.description ?? '');
  const displayText =
    needsTruncation && !isExpanded ? truncateText(item.description ?? '') : item.description ?? '';

  return (
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.9)']}
      style={[
        styles.overlay,
        {
          paddingBottom: Math.max(insets.bottom + TAB_BAR_HEIGHT + 20, TAB_BAR_HEIGHT + 20),
        },
      ]}
    >
      <Text style={styles.title}>{item.name}</Text>
      <View>
        <Text style={styles.description}>
          {displayText}
          {needsTruncation && (
            <Pressable onPress={() => setIsExpanded(!isExpanded)} style={styles.toggleButton}>
              <Text style={styles.toggleText}>{isExpanded ? 'Show less' : 'More'}</Text>
            </Pressable>
          )}
        </Text>
      </View>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 20,
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
  toggleButton: {
    marginTop: 4,
    marginBottom: 4,
  },
  toggleText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});
