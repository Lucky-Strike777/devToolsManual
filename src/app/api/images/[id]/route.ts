import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // TODO: 데이터베이스에서 이미지 정보 조회
    // const image = await db.images.findUnique({ where: { id } });
    
    // 임시로 파일 이름 생성 (실제로는 데이터베이스에서 가져와야 함)
    const fileName = `${id}.jpg`; // 실제 구현시에는 DB에서 확장자 포함한 파일명을 가져와야 함
    
    // 파일 삭제
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    await unlink(filePath);

    // TODO: 데이터베이스에서 이미지 정보 삭제
    // await db.images.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: '이미지 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 