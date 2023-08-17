import { Album } from "@ufo-society1974/types";
import { fetchAlbums } from "./fetchAlbums";

export const getAlbums = async (): Promise<Album[]> => {
  const dataList = await fetchAlbums();

  const albumList: Album[] = dataList.map(
    (data: firebase.firestore.DocumentData) => {
      return {
        id: data.id,
        image: data.imageFile,
        publishedDate: data.publishedDate,
        title: data.title,
        published: data.published,
      };
    }
  );

  return albumList;
};
