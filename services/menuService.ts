import { MenuItem } from '@/types/menu';

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const items: MenuItem[] = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      title: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, and basil',
      price: 14.99,
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
      title: 'Spaghetti Carbonara',
      description: 'Creamy sauce with pancetta and parmesan',
      price: 12.99,
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      title: 'Gourmet Burger',
      description: 'Angus beef patty with caramelized onions and truffle aioli',
      price: 16.99,
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
      title: 'Seafood Paella',
      description: 'Spanish saffron rice with mixed seafood and chorizo',
      price: 24.99,
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae',
      title: 'Salmon Poke Bowl',
      description: 'Fresh salmon, avocado, and mango over sushi rice',
      price: 18.99,
    },
  ];

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return items;
}
