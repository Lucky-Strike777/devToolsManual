export interface CardImage {
  id: string;
  url: string;
  description: string;
  cardId: string;
  createdAt: Date;
  storage_path: string;
}

export interface ImageUploadForm {
  file: File | null;
  description: string;
  cardId: string;
}

export interface SupabaseImage {
  id: string;
  storage_path: string;
  url: string;
  description: string;
  card_id: string;
  created_at: string;
} 