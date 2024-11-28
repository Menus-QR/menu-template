import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { MenuFeed } from '@/components/menu/MenuFeed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MenuFeed />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
