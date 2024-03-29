import type { CreateAlbumDTO, UpdateAlbumDTO } from "@ufo-society1974/types";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import { DraftAlbum } from "../types";

export async function fetchDraftAlbums(): Promise<DraftAlbum[]> {
  const res = await axios.get<DraftAlbum[]>(baseUrl("/draft-albums"));

  return res.data;
}

export async function fetchDraftAlbumById(
  id: string
): Promise<DraftAlbum | undefined> {
  const res = await axios.get<DraftAlbum>(baseUrl(`/draft-albums/${id}`));

  return res.data || undefined;
}

export async function createDraftAlbum(album: CreateAlbumDTO) {
  try {
    await axios.post(baseUrl("/draft-albums"), {
      album,
    });
  } catch {
    throw new Error("アルバムの作成に失敗しました。");
  }
}

export async function updateDraftAlbum(album: UpdateAlbumDTO) {
  try {
    const res = await axios.put(baseUrl(`/draft-albums/${album.id}`), album);

    if (res.status == 404) {
      throw new Error("該当するアルバムが存在しません。");
    }
  } catch {
    throw new Error("アルバムの更新に失敗しました。");
  }
}

export async function deleteDraftAlbum(albumId: string): Promise<void> {
  try {
    const res = await axios.delete(baseUrl(`/draft-albums/${albumId}`));

    if (res.status == 404) {
      throw new Error("該当するアルバムが存在しません。");
    }
  } catch {
    throw new Error("アルバムの更新に失敗しました。");
  }
}

export async function publish(albumId: string): Promise<void> {
  try {
    await axios.post(baseUrl(`/draft-albums/${albumId}/publish`));
  } catch {
    throw new Error("アルバムの公開に失敗しました。");
  }
}
