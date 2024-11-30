export interface MenuItem {
  id: string;
  url: string;
  name: string;
  description: string | null;
  price: number;
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
