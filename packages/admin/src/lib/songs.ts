import { Song } from "@ufo-society1974/types";
import axios from "axios";
import { baseUrl } from "./baseUrl";

export async function fetchSongs(albumId: string): Promise<Song[]> {
  const res = await axios.get<Song[]>(baseUrl(`/albums/${albumId}/songs`));

  return res.data;
}

export async function fetchSongById(
  albumId: string,
  songId: string
): Promise<Song> {
  const res = await axios.get<Song>(
    baseUrl(`/albums/${albumId}/songs/${songId}`)
  );

  return res.data;
}

export async function deleteSong(
  albumId: string,
  songId: string
): Promise<void> {
  await axios.delete(baseUrl(`/albums/${albumId}/songs/${songId}`));

  return;
}
