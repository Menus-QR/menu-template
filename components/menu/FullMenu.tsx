import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  Pressable,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuItem } from '@/types/menu';
import Colors from '@/constants/Colors';
import { MenuCard } from './MenuCard';

interface FullMenuProps {
  items: MenuItem[];
}

export function FullMenu({ items }: FullMenuProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function renderMenuItem({ item }: { item: MenuItem }) {
    return (
      <Pressable style={styles.menuItem} onPress={() => setIsDrawerOpen(false)}>
        <MenuCard item={item} />
      </Pressable>
    );
  }

  if (!items || items.length === 0) {
    return (
      <>
        <TouchableOpacity style={styles.hamburgerButton} onPress={() => setIsDrawerOpen(true)}>
          <Ionicons name="menu" size={32} color={colors.menuText} />
        </TouchableOpacity>

        <Modal
          visible={isDrawerOpen}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsDrawerOpen(false)}
        >
          <Pressable style={styles.modalContainer} onPress={() => setIsDrawerOpen(false)}>
            <Pressable
              style={[styles.drawer, { backgroundColor: Colors.semantic.primaryLight }]}
              onPress={e => e.stopPropagation()}
            >
              <Pressable style={styles.headerArea} onPress={() => setIsDrawerOpen(false)}>
                <View style={[styles.handle, { backgroundColor: colors.navigationBorder }]} />
              </Pressable>
              <Text style={styles.noItemsText}>No menu items available</Text>
            </Pressable>
          </Pressable>
        </Modal>
      </>
    );
  }

  return (
    <>
      <TouchableOpacity style={styles.hamburgerButton} onPress={() => setIsDrawerOpen(true)}>
        <Ionicons name="menu" size={32} color={colors.menuText} />
      </TouchableOpacity>

      <Modal
        visible={isDrawerOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsDrawerOpen(false)}
      >
        <Pressable style={styles.modalContainer} onPress={() => setIsDrawerOpen(false)}>
          <Pressable
            style={[styles.drawer, { backgroundColor: Colors.semantic.primaryLight }]}
            onPress={e => e.stopPropagation()}
          >
            <Pressable style={styles.headerArea} onPress={() => setIsDrawerOpen(false)}>
              <View style={[styles.handle, { backgroundColor: colors.navigationBorder }]} />
            </Pressable>
            <View style={styles.scrollContainer}>
              <FlatList
                data={items}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                overScrollMode="auto"
                decelerationRate="normal"
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  hamburgerButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '90%',
    paddingBottom: 0,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },
  scrollContainer: {
    flex: 1,
    height: '100%',
    overflow: 'scroll',
  },
  list: {
    flex: 1,
    height: '100%',
  },
  listContent: {
    paddingBottom: 20,
  },
  menuItem: {
    cursor: 'pointer',
  },
  noItemsText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  headerArea: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
});
