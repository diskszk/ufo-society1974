import type {
  Song,
  Album,
  User as ServerUserType,
} from "@ufo-society1974/types";
import { RoleType } from "../constants";

export type User = Omit<ServerUserType, "role"> & {
  role: RoleType;
};

export type SelectOption = { label: string; value: string };
export type SelectOptions = SelectOption[];

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
