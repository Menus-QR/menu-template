export interface Category {
  id: number;
  category: string;
  display_order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  image_url: string;
  video_url: string;
  name: string;
  description: string | null;
  category_id: number;
  price: number;
}

export interface CategoryGroup {
  category: Category;
  items: MenuItem[];
}

export interface MenuFeedState {
  items: MenuItem[];
  isLoading: boolean;
  error: string | null;
}

export type MediaType = 'image' | 'video';

export interface MediaContentProps {
  url: string;
  isVisible?: boolean;
  preload?: boolean;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: () => void;
}
