import { useQuery } from "@tanstack/react-query";
import { fetchDraftAlbums, fetchPublishedAlbums } from "../../lib/albums";
import { Album } from "@ufo-society1974/types";

export function useAlbums(): {
  draftAlbums: Album[];
  publishedAlbums: Album[];
} {
  const { data: draftAlbums } = useQuery<Album[]>(
    ["draft-albums"],
    fetchDraftAlbums
  );

  const { data: publishedAlbums } = useQuery<Album[]>(
    ["published-albums"],
    fetchPublishedAlbums
  );

  return {
    draftAlbums: draftAlbums ?? [],
    publishedAlbums: publishedAlbums ?? [],
  };
}