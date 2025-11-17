'use client';

import { useState } from 'react';
import { parseCSV } from '@/lib/csvParser';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    count?: number;
    errors?: string[];
  } | null>(null);
  const [preview, setPreview] = useState<any[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      setPreview(null);

      // プレビュー表示
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvContent = event.target?.result as string;
        const parseResult = parseCSV(csvContent);
        if (parseResult.success && parseResult.data) {
          setPreview(parseResult.data.slice(0, 5)); // 最初の5件をプレビュー
        }
      };
      reader.readAsText(selectedFile, 'UTF-8');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !password) {
      setResult({
        success: false,
        message: 'ファイルとパスワードを入力してください',
      });
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${password}`,
        },
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        setFile(null);
        setPassword('');
        const fileInput = document.getElementById('file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }
    } catch (error: any) {
      setResult({
        success: false,
        message: `アップロードに失敗しました: ${error.message}`,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary-600 mb-2">
          📤 CSVアップロード
        </h1>
        <p className="text-gray-600">
          献立データをCSVファイルでアップロードできます
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CSVファイル
            </label>
            <input
              id="file"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              CSV形式: 日付,曜日,献立,タイプ（ヘッダー行必須）
              <br />
              ※ タイプ列がない場合、デフォルトでA献立として登録されます
            </p>
          </div>

          {preview && preview.length > 0 && (
            <div className="bg-gray-50 rounded p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                プレビュー（最初の5件）:
              </p>
              <div className="space-y-2">
                {preview.map((item, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <span className="font-medium">{item.date}</span> ({item.weekday}) 
                    <span className="ml-2 px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">
                      {item.type}献立
                    </span>
                    : {item.menu}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              管理者パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={uploading || !file}
            className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-colors"
          >
            {uploading ? 'アップロード中...' : 'アップロード'}
          </button>
        </form>

        {result && (
          <div
            className={`mt-6 p-4 rounded-lg ${
              result.success
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <p className="font-medium">{result.message}</p>
            {result.count !== undefined && (
              <p className="text-sm mt-1">登録件数: {result.count}件</p>
            )}
            {result.errors && result.errors.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">警告:</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  {result.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h2 className="font-semibold text-blue-900 mb-2">📝 CSV形式の例</h2>
        <pre className="bg-white p-4 rounded text-sm overflow-x-auto">
          {`日付,曜日,献立,タイプ
2024-01-15,月曜日,ごはん,味噌汁,鮭の塩焼き,ほうれん草のお浸し,牛乳,A
2024-01-15,月曜日,ごはん,味噌汁,魚のフライ,ひじきの煮物,牛乳,B
2024-01-16,火曜日,パン,スープ,ハンバーグ,サラダ,牛乳,A
2024-01-16,火曜日,パン,スープ,チキンカツ,サラダ,牛乳,B`}
        </pre>
        <p className="text-xs text-blue-700 mt-2">
          ※ タイプ列は「A」または「B」を指定してください。省略した場合は「A」として登録されます。
        </p>
      </div>
    </div>
  );
}

