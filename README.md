# UFO society

## 概要
当リポジトリ は、[UFO society](https://twitter.com/ufo_society) のホームページ及びコンテンツ管理アプリ、WebAPIを含むリポジトリです。

### 各ソースコード
- [公式ホームページ](./packages/homepage)
- [コンテンツ管理アプリ](./packages/admin/)
- [WebAPI](./packages/api/)
  
## ドキュメント
- [公式ホームページ](./packages/homepage/README.md)
- [コンテンツ管理アプリ](./packages/admin/README.md)
- [WebAPI](./packages/api/README.md)
- [WEbAPI仕様書](./pakages/api/swagger-spec.yaml)
  - 見れない場合は[こちら](https://asia-northeast2-ufo-society-1974.cloudfunctions.net/api/swagger) からご覧ください

## 技術スタック

### monorepo 
Yarn Workspace を使って monorepo 環境を構築しました。

#### ディレクトリ構成
packages 配下にそれぞれ以下のようにして管理しています。
- homepage: 公式ホームページ用のソースコード
- admin: コンテンツ管理アプリ用のソースコード
- api: WebAPI用のソースコード
- tsconfig: 各ディレクトリのtypescriptで使用するtsconfigを共通化している
- eslint-config: 各ディレクトリで使用する eslint の設定を client , server で分けた上で共通化している

#### ライブラリバージョン
- node 16.14.X
- yarn 3.6.X
- firebase 7.2.X

#### monorepo化によって解決したかったこと
- クライアントが2つ (homepage, admin) 存在しており、どちらも Typescript + React (vite) で書いているので、共通化できるところは共通化することによって、使用ライブラリのバージョン管理などの保守を楽にしたい
- クライントもサーバーも TypeScript で書いてあり、使用する型をすべてのディレクトリで共通化したい
- サーバーの swagger から生成した型情報をクライアントでも使いたい
