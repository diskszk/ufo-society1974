import axios from "axios";
import { WEB_API_BASE_URL } from "../constants";
import { Album } from "../types";

interface AlbumsResponse {
  albums: Album[];
}

export const fetchAlbums = async (): Promise<Album[]> => {
  const res = await axios.get<AlbumsResponse>(`${WEB_API_BASE_URL}/albums`);

  const albums = res.data.albums;

  return albums;
};
