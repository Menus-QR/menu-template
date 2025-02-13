import React, { useEffect, useRef, useState } from 'react';
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
const PADDING_HORIZONTAL = 16; // Define the horizontal padding

export function MenuHeader({ onCategoryPress, selectedCategory }: MenuHeaderProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [itemWidths, setItemWidths] = useState<number[]>([]);
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

  // Scroll to the selected category
  useEffect(() => {
    if (selectedCategory && scrollViewRef.current && itemWidths.length === categories.length) {
      const selectedIndex = categories.findIndex(category => category.id === selectedCategory);
      if (selectedIndex !== -1) {
        const scrollToX = itemWidths.slice(0, selectedIndex).reduce((acc, width) => acc + width, 0);
        scrollViewRef.current.scrollTo({
          x: scrollToX,
          animated: true,
        });
      }
    }
  }, [selectedCategory, categories, itemWidths]);

  const handleLayout = (index: number, event: any) => {
    const { width } = event.nativeEvent.layout;
    setItemWidths(prevWidths => {
      const newWidths = [...prevWidths];
      newWidths[index] = width + 2 * (PADDING_HORIZONTAL + 8); // Add padding to the width
      console.log('newWidths', newWidths);
      return newWidths;
    });
  };

  if (isLoading || categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category: Category, index) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryButton}
            onPress={() => onCategoryPress?.(category.id)}
          >
            <Text style={styles.categoryText} onLayout={event => handleLayout(index, event)}>
              {category.category}
            </Text>
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
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  categoryButton: {
    paddingHorizontal: PADDING_HORIZONTAL,
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
