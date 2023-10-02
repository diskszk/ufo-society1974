import { useFetch } from "../../hooks/api/useFetch";
import { fetchPublishedAlbumById } from "../../lib/publishedAlbums";

export function useFetchPublishedAlbumById(id: string) {
  const { data: album } = useFetch(["published-album", id], () =>
    fetchPublishedAlbumById(id)
  );

  return { album };
}
