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

interface FullMenuProps {
  items: MenuItem[];
}

export function FullMenu({ items }: FullMenuProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function renderMenuItem({ item }: { item: MenuItem }) {
    return (
      <Pressable
        style={[styles.menuItem, { borderBottomColor: colors.navigationBorder }]}
        onPress={() => {
          setIsDrawerOpen(false);
        }}
      >
        <Text style={[styles.menuItemText, { color: colors.menuText }]}>
          {item?.name || 'Unnamed Item'}
        </Text>
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
          <Pressable
            style={[styles.overlay, { backgroundColor: Colors.common.overlay.light }]}
            onPress={() => setIsDrawerOpen(false)}
          >
            <View style={[styles.drawer, { backgroundColor: Colors.semantic.primary }]}>
              <View style={[styles.handle, { backgroundColor: colors.navigationBorder }]} />
              <Text style={[styles.menuItemText, { color: colors.menuText, textAlign: 'center' }]}>
                No menu items available
              </Text>
            </View>
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
        <Pressable
          style={[styles.overlay, { backgroundColor: Colors.common.overlay.light }]}
          onPress={() => setIsDrawerOpen(false)}
        >
          <View style={[styles.drawer, { backgroundColor: Colors.semantic.primary }]}>
            <View style={[styles.handle, { backgroundColor: colors.navigationBorder }]} />
            <FlatList
              data={items}
              renderItem={renderMenuItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.listContent}
              style={styles.list}
            />
          </View>
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
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  drawer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '90%',
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
