import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/menuService';
import { Category } from '@/types/menu';
import { FONT_FAMILY } from '@/constants/Fonts';
interface MenuHeaderProps {
  onCategoryPress?: (category: number) => void;
  selectedCategory?: number;
}

export function MenuHeader({ onCategoryPress, selectedCategory }: MenuHeaderProps) {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Select first category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory && onCategoryPress) {
      onCategoryPress(categories[0].id);
    }
  }, [categories, selectedCategory, onCategoryPress]);

  if (isLoading || categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category: Category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
            onPress={() => onCategoryPress?.(category.id)}
          >
            <Text style={styles.categoryText}>{category.category}</Text>
            {selectedCategory === category.id && <View style={styles.selectedUnderline} />}
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
    fontFamily: FONT_FAMILY.regular,
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
