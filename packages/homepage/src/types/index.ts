export type File = {
  filename: string;
  path: string;
};

export type Album = {
  imageFile: File;
  id: string; // random
  publishedDate: string; // YYYY-MM-DD
  songs?: Song[];
  title: string;
  bandcampUrl: string;
};

export type Song = {
  id: string;
  lyric: string;
  title: string;
  wordsRights: string;
  musicRights: string;
};

export type SongSummary = Pick<Song, "id" | "title">;

export type AlbumInfo = {
  albumId: string;
  songSummaries: SongSummary[];
};

// redux
export type RootStore = {
  modalStatus: ModalStatus;
};

type ModalType = "ERROR" | "LOADING" | "";

export type ModalStatus = {
  isOpen: boolean;
  modalType: ModalType;
  errorMessage: string;
};
