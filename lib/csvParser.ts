import Papa from 'papaparse';
import { Kondate, KondateType } from './data';

export interface CSVParseResult {
  success: boolean;
  data?: Kondate[];
  errors?: string[];
}

/**
 * CSVファイルを解析して献立データに変換
 */
export function parseCSV(csvContent: string): CSVParseResult {
  const errors: string[] = [];
  const kondateList: Kondate[] = [];

  try {
    const result = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
    });

    if (result.errors.length > 0) {
      errors.push(...result.errors.map((e) => e.message));
    }

    // ヘッダー行を確認
    const headers = result.meta.fields || [];
    const requiredHeaders = ['日付', 'date', '曜日', 'weekday', '献立', 'menu'];
    
    const hasDateHeader = headers.some((h) => ['日付', 'date'].includes(h));
    const hasWeekdayHeader = headers.some((h) => ['曜日', 'weekday'].includes(h));
    const hasMenuHeader = headers.some((h) => ['献立', 'menu'].includes(h));
    const hasTypeHeader = headers.some((h) => ['タイプ', 'type', '献立タイプ'].includes(h));

    if (!hasDateHeader || !hasWeekdayHeader || !hasMenuHeader) {
      errors.push('CSVファイルに必要な列（日付、曜日、献立）が含まれていません');
      return { success: false, errors };
    }

    // データ行を処理
    result.data.forEach((row: any, index: number) => {
      try {
        // 日付列を取得（日本語または英語）
        const dateValue = row['日付'] || row['date'] || '';
        // 曜日列を取得
        const weekdayValue = row['曜日'] || row['weekday'] || '';
        // 献立列を取得
        const menuValue = row['献立'] || row['menu'] || '';
        // タイプ列を取得（A or B、デフォルトはA）
        const typeValue = (row['タイプ'] || row['type'] || row['献立タイプ'] || 'A').toString().trim().toUpperCase();

        if (!dateValue || !weekdayValue || !menuValue) {
          errors.push(`行 ${index + 2}: 必須項目が不足しています`);
          return;
        }

        // 日付の形式を正規化（YYYY-MM-DD形式に変換）
        let normalizedDate = dateValue.trim();
        
        // 様々な日付形式に対応
        if (normalizedDate.includes('/')) {
          const parts = normalizedDate.split('/').map(p => p.trim());
          
          if (parts.length === 3) {
            // 年/月/日形式
            let year = parts[0];
            const month = parts[1].padStart(2, '0');
            const day = parts[2].padStart(2, '0');
            
            // 年が2桁の場合は20xxと仮定
            if (year.length === 2) {
              year = '20' + year;
            } else if (year.length === 4) {
              // そのまま使用
            } else {
              throw new Error(`無効な年: ${year}`);
            }
            
            normalizedDate = `${year}-${month}-${day}`;
          } else if (parts.length === 2) {
            // 月/日形式（年がない場合）
            // 前の行の年を参照するか、現在の年をデフォルトとして使用
            let year = '2025'; // デフォルト年（CSVファイルの他の行から推測）
            
            // 前の行の年を参照（可能な場合）
            if (kondateList.length > 0) {
              const lastDate = kondateList[kondateList.length - 1].date;
              const lastYear = lastDate.substring(0, 4);
              year = lastYear;
            } else {
              // 最初の行で年がない場合は、現在の年をデフォルトとして使用
              const currentYear = new Date().getFullYear();
              year = currentYear.toString();
            }
            
            const month = parts[0].padStart(2, '0');
            const day = parts[1].padStart(2, '0');
            
            normalizedDate = `${year}-${month}-${day}`;
          }
        } else if (normalizedDate.match(/^\d{8}$/)) {
          // YYYYMMDD形式
          const year = normalizedDate.substring(0, 4);
          const month = normalizedDate.substring(4, 6);
          const day = normalizedDate.substring(6, 8);
          normalizedDate = `${year}-${month}-${day}`;
        }

        // 日付の妥当性チェック
        const dateObj = new Date(normalizedDate);
        if (isNaN(dateObj.getTime())) {
          errors.push(`行 ${index + 2}: 無効な日付形式です: ${dateValue}`);
          return;
        }

        // 日付の範囲チェック（1900年から2100年まで）
        const year = dateObj.getFullYear();
        if (year < 1900 || year > 2100) {
          errors.push(`行 ${index + 2}: 日付の範囲が無効です: ${dateValue}`);
          return;
        }

        // 献立の長さチェック
        const menuTrimmed = menuValue.trim();
        if (menuTrimmed.length === 0) {
          errors.push(`行 ${index + 2}: 献立が空です`);
          return;
        }

        if (menuTrimmed.length > 1000) {
          errors.push(`行 ${index + 2}: 献立が長すぎます（1000文字以内）`);
          return;
        }

        // タイプの検証
        if (typeValue !== 'A' && typeValue !== 'B') {
          errors.push(`行 ${index + 2}: タイプはAまたはBである必要があります（現在: ${typeValue}）`);
          return;
        }

        const kondate: Kondate = {
          date: normalizedDate,
          weekday: weekdayValue.trim(),
          menu: menuTrimmed,
          type: typeValue as KondateType,
          notes: (row['備考'] || row['notes'] || '').trim(),
        };

        kondateList.push(kondate);
      } catch (error: any) {
        errors.push(`行 ${index + 2}: ${error.message}`);
      }
    });

    if (errors.length > 0 && kondateList.length === 0) {
      return { success: false, errors };
    }

    return {
      success: true,
      data: kondateList,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error: any) {
    return {
      success: false,
      errors: [`CSV解析エラー: ${error.message}`],
    };
  }
}

/**
 * 献立データをCSV形式に変換
 */
export function kondateToCSV(kondateList: Kondate[]): string {
  const csvData = kondateList.map((k) => ({
    日付: k.date,
    曜日: k.weekday,
    献立: k.menu,
    タイプ: k.type,
    備考: k.notes || '',
  }));

  return Papa.unparse(csvData, {
    header: true,
  });
}

