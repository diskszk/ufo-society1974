import axios from "axios";
import { WEB_API_BASE_URL } from "../constants";
import { Song } from "../types";

interface SongsResponse {
  songs: Song[];
}

export async function fetchSong(
  albumId: string,
  songId: string
): Promise<Song> {
  const res = await axios.get<SongsResponse>(
    `${WEB_API_BASE_URL}/albums/${albumId}/songs/${songId}`
  );

  const song = res.data.songs[0];

  return song;
}
