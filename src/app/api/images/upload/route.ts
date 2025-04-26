import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import path from 'path';

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

    // 파일 저장
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // 파일 이름 생성
    const uniqueId = uuidv4();
    const fileExtension = path.extname(file.name);
    const fileName = `${uniqueId}${fileExtension}`;
    
    // 파일 저장 경로
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);
    
    await writeFile(filePath, buffer);
    
    // 데이터베이스에 저장할 이미지 정보
    const imageData = {
      id: uniqueId,
      url: `/uploads/${fileName}`,
      description,
      cardId,
      createdAt: new Date(),
    };

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