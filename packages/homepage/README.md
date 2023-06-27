# UFO society 公式ホームページ

- 友人が加入しているバンド「UFO society」の公式サイト。元々バンドメンバーが作成した HTML,CSS のみの静的サイトの「楽曲の記録」ページに機能追加する形で開発しました。 メンバー間で HTML を操作することなく Web 経由で楽曲の歌詞や音声ファイルを投稿する為に作成した管理アプリに合わせて、リソースを使う為に改修しました。

- Webページの基本的なコーディングは友人が担当し、私は主に下記ディレクトリ・ファイルを開発しました。
  - `public/scripts`
  - `public/src`
  - `public/albums.html`
  - `tsconfig`
  - `webpack.config.js`
  - `firestore.rules`
  - `package.json`

- 共同開発した友人に許可をとり、個人のGitHubリポジトリにてコードを公開しています。

## quick start

- `$ git clone https://github.com/diskszk/ufo-society1974.git`
- `$ cd ufo-society1974-dev`
- `$ npm install`
- `$ npm run build`
- `$ firebase serve`
