import axios from "axios";
import { WEB_API_BASE_URL } from "../constants";
import { Album, AlbumInfo } from "../types";

interface AlbumsResponse {
  albums: Album[];
  info: AlbumInfo;
}

export const fetchAlbum = async (
  albumId: string
): Promise<{ album: Album; info: AlbumInfo }> => {
  const res = await axios.get<AlbumsResponse>(
    `${WEB_API_BASE_URL}/albums/${albumId}`
  );

  const album = res.data.albums[0];
  const info = res.data.info;

  return { album, info };
};
