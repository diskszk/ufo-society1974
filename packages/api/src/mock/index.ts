import { Song } from "../songs/song.entity";
import { Album } from "../albums/album.entity";
import { User } from "../users/user.entity";
import { role } from "../constants";
import { RoleType } from "../types";

const mockSongs: Song[] = [
  {
    id: "001",
    lyric: "test song lyric1",
    title: "test song title1",
    wordsRights: "test word rights1",
    musicRights: "test music rights1",
  },
  {
    id: "002",
    lyric: "test song lyric2",
    title: "test song title2",
    wordsRights: "test word rights2",
    musicRights: "test music rights2",
  },
];

const mockDraftAlbums: Album[] = [
  {
    id: "sample01",
    image: "",
    publishedDate: "20200101",
    title: "test title 1",
    published: true,
  },
  {
    id: "sample02",
    image: "",
    publishedDate: "20200101",
    title: "test title 2",
    published: false,
  },
  {
    id: "published01",
    image: "",
    publishedDate: "20200101",
    title: "test title published 1",
    published: true,
  },
];
const mockPublishedAlbums: Album[] = [
  {
    id: "published01",
    image: "",
    publishedDate: "20200101",
    title: "test title published 1",
    published: true,
  },
];

const createTestUser = (uid: string, role: RoleType): User => {
  return {
    uid: uid,
    username: "name:" + uid,
    role: role,
    email: uid + "@mail.com",
    isDeleted: false,
  };
};

const deletedUser = {
  ...createTestUser("testuid:deleted", role.WATCHER),
  isDeleted: true,
};

const users: User[] = [
  createTestUser("testuid:editor", role.EDITOR),
  createTestUser("testuid:master", role.MASTER),
  createTestUser("testuid:watcher", role.WATCHER),
  deletedUser,
];

export const mockData = {
  songs: mockSongs,
  song: mockSongs[0],
  draftAlbums: mockDraftAlbums,
  publishedAlbums: mockPublishedAlbums,
  album: mockDraftAlbums[0],
  users: users,
  user: {
    editor: users[0],
    master: users[1],
    watcher: users[2],
    deletedUser: users[3],
  },
};
