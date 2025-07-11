# StassheポートフォリオWebサイト

このリポジトリは、Next.jsで構築されたポートフォリオWebサイトです。主に自身の制作物やプロフィール、クライアントワークなどを紹介するためのものです。

## セットアップ方法

1. 依存パッケージのインストール

```bash
npm install
```

2. 開発サーバーの起動

```bash
npm run dev
```

3. ブラウザで `http://localhost:3000` を開いて動作確認

## ディレクトリ構成

- `src/app/`：ページやレイアウト、グローバルCSS
- `src/components/`：ヘッダー、フッター、UIコンポーネント
- `src/contexts/`：テーマ管理などのReact Context
- `src/hooks/`：カスタムフック
- `src/lib/`：ユーティリティ関数
- `DB/work/`：各種プロジェクトの仕様書

## 技術的仕様

- フレームワーク：Next.js（App Router構成）
- 言語：TypeScript
- UI：Tailwind CSS
- アイコン・UIパーツ：独自コンポーネント（`src/components/ui/`）
- 状態管理：React Context（例：ThemeContext）
- フォント：Geist（next/fontによる最適化）
- Lint：ESLint
- その他：PostCSS, Vercelデプロイ対応

## 主なページ

- `/`：トップページ
- `/about`：プロフィール
- `/work`：制作実績一覧（クライアントワーク含む）

## デプロイ

Vercelで簡単にデプロイ可能です。詳細は[Next.js公式ドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)を参照してください。

## ライセンス

MIT
