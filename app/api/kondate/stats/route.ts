import { NextResponse } from 'next/server';
import { getKondateList } from '@/lib/data';

export async function GET() {
  try {
    const kondateList = await getKondateList();
    
    const stats = {
      total: kondateList.length,
      latestDate: kondateList.length > 0 
        ? kondateList[kondateList.length - 1].date 
        : null,
      oldestDate: kondateList.length > 0 
        ? kondateList[0].date 
        : null,
      dateRange: kondateList.length > 0
        ? {
            from: kondateList[0].date,
            to: kondateList[kondateList.length - 1].date,
          }
        : null,
    };

    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: `エラーが発生しました: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

