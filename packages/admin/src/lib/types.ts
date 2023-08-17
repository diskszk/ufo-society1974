import { User, Song, Album } from "@ufo-society1974/types";

// redux
export type RootStore = {
  user: User;
  image: File;
  album: Album;
  songFile: File;
  songs: Song[];

  loadingStatus: LoadingStatus;
  audio: Audio;
};

export type LoadingStatus = {
  isLoading: boolean;
  message: string | null;
};

export type MessageModalState = {
  isOpen: boolean;
  message: string;
};

export type File = {
  filename: string;
  path: string;
};

export type PublishPlatform = {
  AppleMusic: string;
  Spotify: string;
  iTunes: string;
  Bandcamp: string;
};

export type Audio = {
  src: string;
  isPaused: boolean;
};

export type SelectOption = { label: string; value: string };
export type SelectOptions = SelectOption[];
