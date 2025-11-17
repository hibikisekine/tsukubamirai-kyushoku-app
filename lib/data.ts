import fs from 'fs';
import path from 'path';
import {
  isSupabaseAvailable,
  getKondateListFromSupabase,
  saveKondateToSupabase,
  saveKondateListToSupabase,
} from './supabase';

export type KondateType = 'A' | 'B';

export interface Kondate {
  date: string;
  weekday: string;
  menu: string;
  type: KondateType; // A献立 or B献立
  notes?: string;
}

const dataFilePath = path.join(process.cwd(), 'data', 'kondate.json');

// データファイルが存在しない場合は空配列を返す
function ensureDataFile() {
  const dataDir = path.dirname(dataFilePath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2), 'utf-8');
  }
}

// 献立リストを取得
export async function getKondateList(): Promise<Kondate[]> {
  // Supabaseが利用可能な場合はSupabaseから取得
  if (isSupabaseAvailable()) {
    return await getKondateListFromSupabase();
  }

  // フォールバック: ファイルシステムから取得
  ensureDataFile();
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error reading kondate data:', error);
    return [];
  }
}

// 日付とタイプで献立を取得
export async function getKondateByDate(
  date: string,
  type?: KondateType
): Promise<Kondate | null> {
  const kondateList = await getKondateList();
  if (type) {
    return kondateList.find((k) => k.date === date && k.type === type) || null;
  }
  return kondateList.find((k) => k.date === date) || null;
}

// 日付でA/B両方の献立を取得
export async function getKondateByDateBoth(
  date: string
): Promise<{ A: Kondate | null; B: Kondate | null }> {
  const kondateList = await getKondateList();
  const kondateA = kondateList.find((k) => k.date === date && k.type === 'A') || null;
  const kondateB = kondateList.find((k) => k.date === date && k.type === 'B') || null;
  return { A: kondateA, B: kondateB };
}

// 献立を追加・更新
export async function saveKondate(kondate: Kondate): Promise<void> {
  // Supabaseが利用可能な場合はSupabaseに保存
  if (isSupabaseAvailable()) {
    await saveKondateToSupabase(kondate);
    return;
  }

  // フォールバック: ファイルシステムに保存
  ensureDataFile();
  const kondateList = await getKondateList();
  
  // 既存のデータを更新、または新規追加（日付とタイプで判定）
  const index = kondateList.findIndex(
    (k) => k.date === kondate.date && k.type === kondate.type
  );
  if (index >= 0) {
    kondateList[index] = kondate;
  } else {
    kondateList.push(kondate);
  }
  
  // 日付でソート
  kondateList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  fs.writeFileSync(dataFilePath, JSON.stringify(kondateList, null, 2), 'utf-8');
}

// 複数の献立を一括保存
export async function saveKondateList(kondateList: Kondate[]): Promise<void> {
  // Supabaseが利用可能な場合はSupabaseに保存
  if (isSupabaseAvailable()) {
    await saveKondateListToSupabase(kondateList);
    return;
  }

  // フォールバック: ファイルシステムに保存
  ensureDataFile();
  const existingList = await getKondateList();
  
  // 重複を避けながらマージ（日付とタイプの組み合わせで判定）
  const mergedMap = new Map<string, Kondate>();
  
  // 既存データを追加
  existingList.forEach((k) => {
    const key = `${k.date}_${k.type}`;
    mergedMap.set(key, k);
  });
  
  // 新しいデータで上書き
  kondateList.forEach((k) => {
    const key = `${k.date}_${k.type}`;
    mergedMap.set(key, k);
  });
  
  // 配列に変換してソート
  const mergedList = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  fs.writeFileSync(dataFilePath, JSON.stringify(mergedList, null, 2), 'utf-8');
}

