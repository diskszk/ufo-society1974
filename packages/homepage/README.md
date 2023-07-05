# UFO society 公式ホームページ

## 概要
友人が加入しているバンド[UFO society](https://twitter.com/ufo_society)の公式サイト。元々バンドメンバーが作成した HTML,CSS のみの静的サイトの「楽曲の記録」ページに機能追加する形で開発しました。
メンバー間で HTML などのソースコードを編集することなく Web 経由で楽曲の歌詞や音声ファイルを投稿する為に作成した管理アプリに合わせて、リソースを使う為に改修しました。
各 HTML ファイル及びcssファイルのみバンドメンバーが作成しました。

※ 共同開発した友人に許可をとり、個人のGitHubリポジトリにてコードを公開しています。

### コードの概要
- 友人が参加しているバンド「UFO society」のホームページ
- 同リポジトリ内の WebAPI を用いて WebAPI 経由でリソースの作成・変更・削除を行う


## 言語・ライブラリのバージョン

### 言語
- node: 16.X
- typescript: 4.8.X

### 主要ライブラリ
- react: 18.X
- vite: 3.2.X
- redux: 4.X
- mui: 5.10.X
- @tanstack/react-query: 4.22.X
- firebase: 7.X
- jest: 29.X
- @testing-library/react: 13.4.X
- styled-components: 5.3.X

## 環境作成
- `$ git clone https://github.com/diskszk/ufo-society1974.git`
- `$ cd ufo-society1974`
- `$ yarn install`
- `$ yarn workspace homepage dev`

## 動作確認
`$ yarn workspace homepage dev`

## テスト
`$ yarn workspace homepage test`
