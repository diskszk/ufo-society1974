import { RootStore } from "../lib/types";
import { NO_IMAGE } from "../constants";

export const initialState: RootStore = {
  user: {
    uid: "",
    username: "",
    role: "",
    email: "",
    isDeleted: false,
  },
  image: {
    filename: "",
    path: NO_IMAGE,
  },
  album: {
    image: "",
    id: "",
    publishedDate: "",
    title: "",
    published: false,
  },
  songFile: {
    filename: "",
    path: "",
  },
  songs: [
    {
      id: "",
      lyric: "",
      title: "",
      wordsRights: "amane toda",
      musicRights: "amane toda",
    },
  ],

  loadingStatus: {
    isLoading: false,
    message: null,
  },
  audio: {
    src: "",
    isPaused: true,
  },
};
