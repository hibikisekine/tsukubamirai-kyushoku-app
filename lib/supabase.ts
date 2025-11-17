import { createClient } from '@supabase/supabase-js';
import { Kondate } from './data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// クライアント用（読み取り専用、ブラウザで使用）
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// サーバー用（管理者権限、サーバーサイドでのみ使用）
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Supabaseが利用可能かチェック
export const isSupabaseAvailable = () => {
  return supabase !== null && supabaseAdmin !== null;
};

// データベースから献立リストを取得
export async function getKondateListFromSupabase(): Promise<Kondate[]> {
  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('kondate')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching kondate:', error);
      return [];
    }

    return (data || []).map((row) => ({
      date: row.date,
      weekday: row.weekday,
      menu: row.menu,
      type: row.type as 'A' | 'B',
      notes: row.notes || '',
    }));
  } catch (error) {
    console.error('Error fetching kondate:', error);
    return [];
  }
}

// データベースに献立を保存
export async function saveKondateToSupabase(kondate: Kondate): Promise<void> {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client is not available');
  }

  try {
    const { error } = await supabaseAdmin
      .from('kondate')
      .upsert(
        {
          date: kondate.date,
          weekday: kondate.weekday,
          menu: kondate.menu,
          type: kondate.type,
          notes: kondate.notes || '',
        },
        {
          onConflict: 'date,type',
        }
      );

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error saving kondate:', error);
    throw error;
  }
}

// データベースに複数の献立を一括保存
export async function saveKondateListToSupabase(
  kondateList: Kondate[]
): Promise<void> {
  if (!supabaseAdmin) {
    throw new Error('Supabase admin client is not available');
  }

  try {
    const data = kondateList.map((k) => ({
      date: k.date,
      weekday: k.weekday,
      menu: k.menu,
      type: k.type,
      notes: k.notes || '',
    }));

    const { error } = await supabaseAdmin
      .from('kondate')
      .upsert(data, {
        onConflict: 'date,type',
      });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error saving kondate list:', error);
    throw error;
  }
}

