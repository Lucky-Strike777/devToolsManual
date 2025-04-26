import { NextResponse } from 'next/server';
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
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
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

    // TODO: 데이터베이스에 이미지 정보 저장
    // 여기에 데이터베이스 저장 로직 추가

    return NextResponse.json(imageData);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 