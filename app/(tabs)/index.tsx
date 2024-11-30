import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { MenuFeed } from '@/components/menu/MenuFeed';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function TabOneScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MenuFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
