import { UseQueryResult } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";
import { Album } from "@ufo-society1974/types";
import { fetchDraftAlbumById } from "../../../lib/draftAlbums";
import { fetchPublishedAlbumById } from "../../../lib/publishedAlbums";
import { useFetch } from "../useFetch";

export function useFetchAlbum(): UseQueryResult<Album | undefined> {
  const { id } = useParams<{ id: string }>();

  const s = useLocation().pathname.split("/")[2];

  const queryKey = s === "edit" ? "draft-album" : "published-album";

  const queryFn = s === "edit" ? fetchDraftAlbumById : fetchPublishedAlbumById;

  return useFetch([queryKey, id], () => queryFn(id));
}
