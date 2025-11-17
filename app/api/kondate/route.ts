import { NextRequest, NextResponse } from 'next/server';
import { getKondateList, getKondateByDate } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');

    if (date) {
      // 特定の日付の献立を取得
      const kondate = await getKondateByDate(date);
      if (!kondate) {
        return NextResponse.json(
          { success: false, message: '献立が見つかりません' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: kondate });
    }

    // 全献立リストを取得
    const kondateList = await getKondateList();
    return NextResponse.json({ success: true, data: kondateList });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: `エラーが発生しました: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

