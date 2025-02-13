import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuItem } from '@/types/menu';
import { DESCRIPTION_CHARACTER_LIMIT, TAB_BAR_HEIGHT } from '@/constants/layout';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMenuContext } from './MenuContext';

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
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { setIsDrawerOpen } = useMenuContext();

  const needsTruncation = shouldTruncate(item.description ?? '');
  const displayText =
    needsTruncation && !isExpanded ? truncateText(item.description ?? '') : item.description ?? '';

  return (
    <LinearGradient
      colors={[Colors.common.transparent, Colors.common.overlay.light, Colors.common.overlay.dark]}
      style={[
        styles.overlay,
        {
          paddingBottom: insets.bottom + 20,
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.menuTitle }]}>{item.name}</Text>
        <Pressable onPress={() => setIsDrawerOpen(true)} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color={colors.menuTitle} />
        </Pressable>
      </View>
      <Text style={[styles.price, { color: colors.menuPrice }]}>${item.price.toFixed(2)}</Text>
      <View>
        <Text style={[styles.description, { color: colors.menuText }]}>
          {displayText}
          {needsTruncation && (
            <Pressable onPress={() => setIsExpanded(!isExpanded)} style={styles.toggleButton}>
              <Text style={[styles.toggleText, { color: colors.menuLink }]}>
                {isExpanded ? 'Show less' : 'More'}
              </Text>
            </Pressable>
          )}
        </Text>
      </View>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  toggleButton: {
    marginTop: 4,
    marginBottom: 4,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  menuButton: {
    padding: 4,
  },
});
