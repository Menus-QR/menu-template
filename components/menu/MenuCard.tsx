import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { MenuItem } from '@/types/menu';
import Colors from '@/constants/Colors';
import { FONT_FAMILY } from '@/constants/Fonts';
import { useMenuContext } from './MenuContext';

interface MenuCardProps {
  item: MenuItem;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}

export function MenuCard({ item, setIsDrawerOpen }: MenuCardProps) {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const { setSelectedVideoId } = useMenuContext();

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        setIsDrawerOpen(false);
        // Add a small delay to let the drawer close
        setTimeout(() => {
          setSelectedVideoId(item.id);
          // Clear the selectedVideoId after a short delay to allow scrolling
          setTimeout(() => {
            setSelectedVideoId(null);
          }, 1000); // Adjust this timing if needed
        }, 230);
      }}
    >
      <View style={styles.cardContainer}>
        <Image
          source={{
            uri: item.image_url,
          }}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.name, { color: colors.menuText }]}>{item.name}</Text>
            <Text style={[styles.price, { color: colors.menuText }]}>
              ${item.price?.toFixed(2)}
            </Text>
          </View>
          <Text style={[styles.description, { color: colors.menuText }]} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: Colors.semantic.primary,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
    fontFamily: FONT_FAMILY.regular,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.regular,
  },
  description: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
  },
});
