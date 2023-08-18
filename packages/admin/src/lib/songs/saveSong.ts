import { db } from "../../firebase";
import { Song } from "@ufo-society1974/types";

export const saveSong = async (song: Song, albumId: string): Promise<void> => {
  const songsRef = db
    .collection("albums")
    .doc(albumId)
    .collection("songs")
    .doc(song.id);

  const data: Song = {
    ...song,
  };

  await songsRef.set(data, { merge: true });
};
