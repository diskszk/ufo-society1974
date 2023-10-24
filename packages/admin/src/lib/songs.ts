import { CreateSongDTO, Song, UpdateSongDTO } from "@ufo-society1974/types";
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

export async function createSong(
  albumId: string,
  data: CreateSongDTO
): Promise<void> {
  try {
    await axios.post(baseUrl(`/albums/${albumId}/songs`), data);
  } catch {
    throw new Error("楽曲の作成に失敗しました。");
  }
}

export async function updateSong(
  albumId: string,
  songId: string,
  data: UpdateSongDTO
): Promise<void> {
  try {
    await axios.put(baseUrl(`/albums/${albumId}/songs/${songId}`), data);
  } catch {
    throw new Error("楽曲の更新に失敗しました。");
  }
}

export async function deleteSong(
  albumId: string,
  songId: string
): Promise<void> {
  try {
    await axios.delete(baseUrl(`/albums/${albumId}/songs/${songId}`));
  } catch {
    throw new Error("楽曲の削除に失敗しました。");
  }
}
