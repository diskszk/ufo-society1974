import { UseQueryResult } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Album } from "@ufo-society1974/types";
import { fetchDraftAlbumById } from "../../../lib/draftAlbums";
import { fetchPublishedAlbumById } from "../../../lib/publishedAlbums";
import { useFetch } from "../useFetch";
import { useStatus } from "../../useStatus";

export function useFetchAlbum(): UseQueryResult<Album | undefined> {
  const { id } = useParams<{ id: string }>();

  const [getStatus] = useStatus();
  const { status } = getStatus();

  const queryKey = status === "edit" ? "draft-album" : "published-album";

  const queryFn: (id: string) => Promise<Album | undefined> =
    status === "edit" ? fetchDraftAlbumById : fetchPublishedAlbumById;

  return useFetch([queryKey, id], () => queryFn(id));
}
