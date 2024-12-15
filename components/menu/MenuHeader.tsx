import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Colors from '@/constants/Colors';
const CATEGORIES = ['Appetizers', 'Main Dishes', 'Tacos', 'Sandwiches', 'Desserts'];

interface MenuHeaderProps {
  onCategoryPress?: (category: string) => void;
  selectedCategory?: string;
}

export function MenuHeader({
  onCategoryPress,
  selectedCategory: externalSelected,
}: MenuHeaderProps) {
  const [internalSelected, setInternalSelected] = useState<string>(CATEGORIES[0]);

  // Use external value if provided, otherwise use internal state
  const selectedCategory = externalSelected ?? internalSelected;

  const handlePress = (category: string) => {
    setInternalSelected(category);
    onCategoryPress?.(category);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => handlePress(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
            {selectedCategory === category && <View style={styles.selectedUnderline} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingVertical: 10,
    // borderBottomWidth: 2,
    // borderBottomColor: Colors.semantic.primary,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    position: 'relative',
    alignItems: 'center',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  selectedUnderline: {
    position: 'absolute',
    bottom: 0,
    // left: '25%',
    height: 4,
    borderRadius: 15,
    width: '85%',
    backgroundColor: Colors.semantic.primary,
  },
});
