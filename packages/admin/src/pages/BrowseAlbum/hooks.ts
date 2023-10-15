import { useFetch } from "../../hooks/api/useFetch";
import { fetchPublishedAlbumById } from "../../lib/publishedAlbums";

export function useFetchPublishedAlbumById(id: string) {
  return useFetch(["published-album", id], () => fetchPublishedAlbumById(id));
}
