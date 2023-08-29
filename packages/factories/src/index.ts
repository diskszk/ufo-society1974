import type { Album, Song, User } from "@ufo-society1974/types";

type Factory<T> = (idParam: string, injectValue?: Partial<T>) => T;

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

export const createMockSong: Factory<Song> = (
  idParam: string,
  injectValue?: Partial<Song>
): Song => {
  const song: Song = {
    id: idParam,
    lyric: lyric.kite,
    title: `ソングタイトル${idParam}`,
    wordsRights: "XXX XXX",
    musicRights: "YYY YYY",
  };

  return {
    ...song,
    ...injectValue,
  };
};

export const crateMockAlbum: Factory<Album> = (
  idParam: string,
  injectValue?: Partial<Album>
): Album => {
  const album: Album = {
    id: `album-id-${idParam}`,
    image: "",
    publishedDate: "1995-02-03",
    title: `テストアルバムタイトル${idParam}`,
    published: false,
  };

  return {
    ...album,
    ...injectValue,
  };
};

export const createMockUser: Factory<User> = (
  idParam: string,
  injectValue?: Partial<User>
): User => {
  const user: User = {
    email: "test@example.com",
    uid: idParam,
    username: `テストユーザー${idParam}`,
    role: "editor",
    isDeleted: false,
  };

  return {
    ...user,
    ...injectValue,
  };
};
