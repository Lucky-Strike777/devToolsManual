import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    const cardId = formData.get('cardId') as string;

    if (!file || !description || !cardId) {
      return new Response(
        JSON.stringify({ error: '필수 필드가 누락되었습니다.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const uniqueId = uuidv4();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uniqueId}.${fileExtension}`;
    const storagePath = `images/${cardId}/${fileName}`;

    // 파일을 ArrayBuffer로 변환
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Supabase Storage에 파일 업로드
    const { data: storageData, error: storageError } = await supabase.storage
      .from('card-images')
      .upload(storagePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (storageError) {
      throw new Error(`Storage error: ${storageError.message}`);
    }

    // 공개 URL 가져오기
    const { data: publicUrl } = supabase.storage
      .from('card-images')
      .getPublicUrl(storagePath);

    // 데이터베이스에 이미지 정보 저장
    const { data: imageData, error: dbError } = await supabase
      .from('images')
      .insert([
        {
          id: uniqueId,
          storage_path: storagePath,
          url: publicUrl.publicUrl,
          description,
          card_id: cardId,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    return new Response(JSON.stringify(imageData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(
      JSON.stringify({ error: '파일 업로드 중 오류가 발생했습니다.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 