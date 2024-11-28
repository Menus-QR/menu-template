import { MenuItem } from '@/types/menu';
import { supabase } from '@/lib/supabase';

export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase.from('platillos').select('*').throwOnError();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No data returned from Supabase');
      return [];
    }

    const menuItems: MenuItem[] = data.map(item => ({
      id: item.id.toString(),
      url: item.url,
      name: item.name,
      description: item.description,
      price: item.price,
    }));

    return menuItems;
  } catch (error) {
    console.error('Error in fetchMenuItems:', error);
    throw error;
  }
}
