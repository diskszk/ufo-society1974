# UFO society公式ホームページコンテンツ管理アプリ

## コードの概要
- 友人が参加しているバンド「UFO society」のホームページの管理機能を持つWebアプリケーション
- Firebase Authentication用いてユーザーの登録・管理の機能を実装した
- 同リポジトリ内の WebAPI を用いて WebAPI 経由でリソースの作成・変更・削除を行う

## 言語・ライブラリのバージョン

### 言語
- node: 16.X
- typescript: 5.0.X

### 主要ライブラリ
- react: 18.X
- vite: 4.3.X
- redux: 4.X
- mui: 5.13.X
- @tanstack/react-query: 4.29.X
- firebase: 7.X
- jest: 29.X
- @testing-library/react: 13.4.X
- storybook: 7.0.X
- sass: 1.32.X

## 環境作成
- リポジトリをクローンしてください  
`$ git clone https://github.com/diskszk/ufo-society1974.git`  
- 作業ディレクトリに移動してください  
`$ cd ufo-society1974`
- 必要なライブラリをインストールしてください  
`$ yarn install`
- ローカル環境に.envファイルを作成し下記コードを貼り付け、それぞれの右辺にfirebaseより取得した値を入力してください  
`$ touch ./packages/admin/.env`  
  ```
  REACT_APP_FIREBASE_KEY=
  REACT_APP_FIREBASE_APP_ID=
  REACT_APP_FIREBASE_MEASUREMENT_ID=
  ```

## 動作確認
- コンテンツ管理アプリのデベロップサーバーを起動してください  
`$ yarn workspace admin dev`

## テスト
`$ yarn workspace admin test`

## アプリケーション作成のきっかけ
元々のWebページに追加で「曲ごとの歌詞を表示したい」、「楽曲をWebページ上から聴ける機能が欲しい」との要望と、Webページの開発者が諸事情によりWebページの運用が難しくなっとことを受け、バンドのメンバーがWebブラウザ上からコンテンツを追加・削除・編集できるようにする為のアプリケーションを作成しました。
