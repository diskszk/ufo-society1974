# UFO society WebAPI

## 概要
UFO society 内のホームページ及びコンテンツ管理アプリに向けたWebAPI。
もともとは、クライアントから直接firestoreへの読み書きを実装していたが、間にWebAPIを挟むことによって、同じ処理を２つのクライアントにそれぞれ実装せずにすみ、また、mswなどを使ったテストやデバッグをしやすくしたくて、当WebAPIの開発に至りました。

## 言語・ライブラリのバージョン

### 言語
- node: 16.X
- typescript: 4.5.X

### 主要ライブラリ
- nestjs: 8.X
- firebase-functions: 4.2.X
- firebase-admin: 10.0.X
- express: 4.18.X
- jest: 27.2.X

## 環境作成
- `$ git clone https://github.com/diskszk/ufo-society1974.git`
- `$ cd ufo-society1974`
- `$ yarn install`

## 動作確認
- `$ yarn workspace api serve`

## テスト
- `$ yarn workspace api test`
