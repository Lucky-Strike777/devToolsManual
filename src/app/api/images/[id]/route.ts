import { supabase } from '@/lib/supabase';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 데이터베이스에서 이미지 정보 조회
    const { data: image, error: fetchError } = await supabase
      .from('images')
      .select('storage_path')
      .eq('id', id)
      .single();

    if (fetchError) {
      throw new Error(`Fetch error: ${fetchError.message}`);
    }

    if (!image) {
      return new Response(
        JSON.stringify({ error: '이미지를 찾을 수 없습니다.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Supabase Storage에서 파일 삭제
    const { error: storageError } = await supabase.storage
      .from('card-images')
      .remove([image.storage_path]);

    if (storageError) {
      throw new Error(`Storage error: ${storageError.message}`);
    }

    // 데이터베이스에서 이미지 정보 삭제
    const { error: dbError } = await supabase
      .from('images')
      .delete()
      .eq('id', id);

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Delete error:', error);
    return new Response(
      JSON.stringify({ error: '이미지 삭제 중 오류가 발생했습니다.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 