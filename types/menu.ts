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
