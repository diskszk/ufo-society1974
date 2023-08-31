import { Album, UpdateAlbumDTO } from "@ufo-society1974/types";
import { ERROR_MESSAGE, WEB_API_BASE_URL } from "../constants";
import axios from "axios";

const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};

export async function fetchPublishedAlbums(): Promise<Album[]> {
  const res = await axios.get<Album[]>(baseUrl("/albums"));

  return res.data;
}

export async function fetchPublishedAlbumById(albumId: string): Promise<Album> {
  const res = await axios.get<Album>(baseUrl(`/albums/${albumId}`));

  return res.data || undefined;
}

export async function updatePublishedAlbum(
  albumId: string,
  body: UpdateAlbumDTO
): Promise<void> {
  const res = await axios.put(baseUrl(`/albums/${albumId}`), {
    body,
  });

  if (res.status === 204) {
    return;
  }

  if (res.status === 404) {
    throw new Error(ERROR_MESSAGE.notFound("IDと一致する公開中のアルバム"));
  } else {
    throw Error(ERROR_MESSAGE.serverError);
  }
}

export async function unpublish(albumId: string): Promise<void> {
  const res = await axios.post(`/albums/${albumId}/unpublish`);

  if (res.status === 201) {
    return;
  }

  if (res.status === 404) {
    throw new Error(ERROR_MESSAGE.notFound("IDと一致する公開中のアルバム"));
  } else {
    throw Error(ERROR_MESSAGE.serverError);
  }
}
