import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LOGO_URL } from '@/constants/Logo';

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: LOGO_URL }} style={[styles.logo]} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  logo: {
    height: 60,
    width: 120,
    resizeMode: 'contain',
  },
});
