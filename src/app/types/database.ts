export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Card {
  id: string;
  category_id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: string;
  card_id: string;
  storage_path: string;
  url: string;
  description: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at'>>;
      };
      cards: {
        Row: Card;
        Insert: Omit<Card, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Card, 'id' | 'created_at' | 'updated_at'>>;
      };
      images: {
        Row: Image;
        Insert: Omit<Image, 'id' | 'created_at'>;
        Update: Partial<Omit<Image, 'id' | 'created_at'>>;
      };
    };
    Functions: {
      get_card_images: {
        Args: { p_card_id: string };
        Returns: Image[];
      };
      delete_card_image: {
        Args: { p_image_id: string };
        Returns: boolean;
      };
    };
  };
} 