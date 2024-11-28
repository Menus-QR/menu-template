import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MenuFeed from './src/components/MenuFeed';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <MenuFeed />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App; 