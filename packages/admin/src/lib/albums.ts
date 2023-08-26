import { Album, CreateAlbumDTO, UpdateAlbumDTO } from "@ufo-society1974/types";
import { WEB_API_BASE_URL } from "../constants";
import axios from "axios";

const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};

export async function fetchAlbumById(id: string): Promise<Album> {
  const res = await axios.get<Album>(baseUrl(`/draft-albums/${id}`));

  return res.data;
}

export async function createAlbum(album: CreateAlbumDTO) {
  try {
    await axios.post(baseUrl("/draft-albums"), {
      album,
    });
  } catch {
    throw new Error("アルバムの作成に失敗しました。");
  }
}

export async function updateAlbum(album: UpdateAlbumDTO) {
  try {
    const res = await axios.put(baseUrl(`/draft-albums/${album.id}`), album);

    if (res.status == 400) {
      throw new Error("該当するアルバムが存在しません。");
    }
  } catch {
    throw new Error("アルバムの更新に失敗しました。");
  }
}

export async function uploadImageFile(formData: FormData, filename: string) {
  // const imageFile = data.imageFile.item(0) as File;

  // const formData = new FormData();

  // formData.append("imageFile", imageFile);
  try {
    // TODO: 型をつける
    const res = await axios.post(
      baseUrl(`/draft-albums/images/${filename}`),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch {
    throw new Error("画像ファイルの保存に失敗しました。");
  }
}
