export interface MenuItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
}

export interface MenuFeedState {
  items: MenuItem[];
  isLoading: boolean;
  error: string | null;
}
