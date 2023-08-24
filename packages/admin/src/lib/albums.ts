import { Album } from "@ufo-society1974/types";
import { WEB_API_BASE_URL } from "../constants";
import axios from "axios";

const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};

export async function fetchAlbumById(id: string): Promise<Album> {
  const res = await axios.get<Album>(baseUrl(`/draft-albums/${id}`));

  return res.data;
}
