export interface CardImage {
  id: string;
  url: string;
  description: string;
  cardId: string;
  createdAt: Date;
}

export interface ImageUploadForm {
  file: File | null;
  description: string;
  cardId: string;
} 