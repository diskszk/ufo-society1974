import { Album, CreateAlbumDTO, UpdateAlbumDTO } from "@ufo-society1974/types";
import { ERROR_MESSAGE, WEB_API_BASE_URL } from "../constants";
import axios from "axios";

const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};

export async function fetchDraftAlbums(): Promise<Album[]> {
  const res = await axios.get<Album[]>(baseUrl("/draft-albums"));

  return res.data;
}

export async function fetchDraftAlbumById(
  id: string
): Promise<Album | undefined> {
  const res = await axios.get<Album>(baseUrl(`/draft-albums/${id}`));

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
  const res = await axios.post(`/draft-albums/${albumId}/publish`);

  if (res.status === 201) {
    return;
  }

  if (res.status === 404) {
    throw new Error(ERROR_MESSAGE.notFound("IDと一致する公開中のアルバム"));
  } else {
    throw Error(ERROR_MESSAGE.serverError);
  }
}