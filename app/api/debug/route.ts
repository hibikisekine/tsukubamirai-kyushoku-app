import { NextResponse } from 'next/server';
import { isSupabaseAvailable, getKondateListFromSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const debugInfo: any = {
      timestamp: new Date().toISOString(),
      environment: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasSupabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
        supabaseAnonKeyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20) + '...'
          : 'NOT SET',
        supabaseServiceKeyPrefix: process.env.SUPABASE_SERVICE_ROLE_KEY
          ? process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 20) + '...'
          : 'NOT SET',
      },
      supabase: {
        isAvailable: isSupabaseAvailable(),
      },
      data: {
        count: 0,
        sample: null,
        error: null,
      },
    };

    // Supabaseからデータを取得してみる
    if (isSupabaseAvailable()) {
      try {
        const kondateList = await getKondateListFromSupabase();
        debugInfo.data.count = kondateList.length;
        debugInfo.data.sample = kondateList.slice(0, 3); // 最初の3件
      } catch (error: any) {
        debugInfo.data.error = error.message;
      }
    } else {
      debugInfo.data.error = 'Supabase is not available';
    }

    return NextResponse.json(debugInfo, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

