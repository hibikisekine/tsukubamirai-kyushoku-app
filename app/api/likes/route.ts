import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, supabase } from '@/lib/supabase';

// 「食べたい」カウントを取得
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const type = searchParams.get('type');

    if (!date || !type) {
      return NextResponse.json(
        { error: 'date and type are required' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase client is not initialized' },
        { status: 500 }
      );
    }

    // カウントを取得（存在しない場合は0を返す）
    const { data, error } = await supabase
      .from('kondate_likes')
      .select('count')
      .eq('date', date)
      .eq('type', type.toUpperCase())
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116は「行が見つからない」エラー
      console.error('Error fetching likes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch likes' },
        { status: 500 }
      );
    }

    const count = data?.count || 0;

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error in GET /api/likes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 「食べたい」カウントを増やす
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, type } = body;

    if (!date || !type) {
      return NextResponse.json(
        { error: 'date and type are required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase admin client is not initialized' },
        { status: 500 }
      );
    }

    // 既存のレコードを取得
    const { data: existing } = await supabaseAdmin
      .from('kondate_likes')
      .select('count')
      .eq('date', date)
      .eq('type', type.toUpperCase())
      .single();

    const currentCount = existing?.count || 0;
    const newCount = currentCount + 1;

    // upsertでカウントを更新（存在しない場合は新規作成）
    const { data, error } = await supabaseAdmin
      .from('kondate_likes')
      .upsert(
        {
          date,
          type: type.toUpperCase(),
          count: newCount,
        },
        {
          onConflict: 'date,type',
        }
      )
      .select()
      .single();

    if (error) {
      console.error('Error updating likes:', error);
      return NextResponse.json(
        { error: 'Failed to update likes' },
        { status: 500 }
      );
    }

    return NextResponse.json({ count: data.count });
  } catch (error) {
    console.error('Error in POST /api/likes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


