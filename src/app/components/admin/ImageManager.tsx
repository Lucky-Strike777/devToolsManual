import { useState } from 'react';
import { CardImage, ImageUploadForm } from '../../types/image';
import Image from 'next/image';

interface ImageManagerProps {
  cardId: string;
  isAdmin: boolean;
  initialImages?: CardImage[];
}

export default function ImageManager({ cardId, isAdmin, initialImages = [] }: ImageManagerProps) {
  const [images, setImages] = useState<CardImage[]>(initialImages);
  const [form, setForm] = useState<ImageUploadForm>({
    file: null,
    description: '',
    cardId: cardId,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, file: e.target.files[0] });
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, description: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.file) return;

    const formData = new FormData();
    formData.append('file', form.file);
    formData.append('description', form.description);
    formData.append('cardId', cardId);

    try {
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const newImage = await response.json();
      setImages([...images, newImage]);
      setForm({ file: null, description: '', cardId });
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Delete failed');

      setImages(images.filter(img => img.id !== imageId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {isAdmin && (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">이미지</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">설명</label>
            <textarea
              value={form.description}
              onChange={handleDescriptionChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            업로드
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-48">
              <Image
                src={image.url}
                alt={image.description}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm">{image.description}</p>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(image.id)}
                  className="mt-2 text-red-600 text-sm hover:text-red-800"
                >
                  삭제
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 