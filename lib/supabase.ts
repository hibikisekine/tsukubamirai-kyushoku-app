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

// データベースから献立リストを取得（city でフィルタリング可能）
export async function getKondateListFromSupabase(city?: string): Promise<Kondate[]> {
  if (!supabase) {
    console.error('[getKondateListFromSupabase] Supabase client is not initialized');
    return [];
  }

  try {
    let query = supabase
      .from('kondate')
      .select('*')
      .order('date', { ascending: true });

    if (city) {
      query = query.eq('city', city);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[getKondateListFromSupabase] Supabaseエラー:', error);
      return [];
    }

    const result = (data || []).map((row) => ({
      date: row.date,
      weekday: row.weekday,
      menu: row.menu,
      type: row.type as string,
      city: row.city || 'つくばみらい市',
      notes: row.notes || '',
    }));

    console.log(`[getKondateListFromSupabase] ${result.length} 件取得 (city=${city ?? 'all'})`);
    return result;
  } catch (error) {
    console.error('[getKondateListFromSupabase] 例外エラー:', error);
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
          city: kondate.city || 'つくばみらい市',
          notes: kondate.notes || '',
        },
        {
          onConflict: 'city,date,type',
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
      city: k.city || 'つくばみらい市',
      notes: k.notes || '',
    }));

    const { error } = await supabaseAdmin
      .from('kondate')
      .upsert(data, {
        onConflict: 'city,date,type',
      });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error saving kondate list:', error);
    throw error;
  }
}

