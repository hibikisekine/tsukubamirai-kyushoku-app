import { NextRequest, NextResponse } from 'next/server';
import { parseCSV } from '@/lib/csvParser';
import { saveKondateList } from '@/lib/data';

// 管理者パスワード（環境変数から取得、本番環境では適切な認証を実装）
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(request: NextRequest) {
  try {
    // パスワードチェック（簡易版、本番では適切な認証を実装）
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return NextResponse.json(
        { success: false, message: '認証に失敗しました' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const defaultType = (formData.get('defaultType') as string) || 'A';

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'ファイルが選択されていません' },
        { status: 400 }
      );
    }

    // CSVファイルの読み込み
    const csvContent = await file.text();
    
    // CSV解析
    const parseResult = parseCSV(csvContent);

    if (!parseResult.success || !parseResult.data) {
      return NextResponse.json(
        {
          success: false,
          message: 'CSVファイルの解析に失敗しました',
          errors: parseResult.errors,
        },
        { status: 400 }
      );
    }

    // データを保存
    await saveKondateList(parseResult.data);

    return NextResponse.json({
      success: true,
      message: `${parseResult.data.length}件の献立データを登録しました`,
      count: parseResult.data.length,
      errors: parseResult.errors, // 警告があれば返す
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        message: `エラーが発生しました: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

