import { Album, Song, User } from "@ufo-society1974/types";
import three_songs from "../assets/images/three_songs.jpeg";

const lyric = {
  kite: `ちゃちな指輪で 夢を見せるように
さみしい公園で描いた迷路

きみには愛が きみには風景が
ガラス瓶の中に ずっと
影を落としている

ビー玉あそびを
町が透けるまで
そうだ
きみは何か思うのに

音も無く
機体はきみの空を覆う
明滅に向かうように
空をのぼったら

着地しないはずの
目盛りだらけの月
きみの手で 白い手で
空をこじあけて`,
};

export const mockSongs: Song[] = [
  {
    id: "1",
    lyric: lyric.kite,
    title: "ソングタイトル01",
    wordsRights: "XXX XXX",
    musicRights: "YYY YYY",
  },
  {
    id: "2",
    lyric: lyric.kite,
    title: "ソングタイトル02",
    wordsRights: "XXX XXX",
    musicRights: "YYY YYY",
  },
  {
    id: "3",
    lyric: lyric.kite,
    title: "ソングタイトル03",
    wordsRights: "XXX XXX",
    musicRights: "YYY YYY",
  },
];

export const mockAlbums: Album[] = [
  {
    id: "album-id-01",
    image: three_songs,
    publishedDate: "1995-02-03",
    title: "テストアルバムタイトル01",
    published: false,
  },
];

export const mockUsers: User[] = [
  {
    email: "test@example.com",
    uid: "uid001",
    username: "テストユーザー1",
    role: "editor",
    isDeleted: false,
  },
  {
    email: "test@example.com",
    uid: "uid002",
    username: "テストユーザー2",
    role: "watcher",
    isDeleted: false,
  },
  {
    email: "test@example.com",
    uid: "uid003",
    username: "テストユーザー3",
    role: "master",
    isDeleted: false,
  },
];
