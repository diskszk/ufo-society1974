import { Song } from "@ufo-society1974/types";
import axios from "axios";
import { WEB_API_BASE_URL } from "../constants";

export async function fetchSongs(albumId: string): Promise<Song[]> {
  const res = await axios.get<Song[]>(
    `${WEB_API_BASE_URL}/albums/${albumId}/songs`
  );

  return res.data;
}

export async function deleteSong(
  albumId: string,
  songId: string
): Promise<void> {
  await axios.delete(`${WEB_API_BASE_URL}/albums/${albumId}/songs/${songId}`);

  return;
}
