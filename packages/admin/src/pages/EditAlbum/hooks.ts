import { UseQueryResult, useMutation } from "@tanstack/react-query";
import { Album, UpdateAlbumDTO } from "@ufo-society1974/types";
import { fetchDraftAlbumById, updateDraftAlbum } from "../../lib/draftAlbums";
import { fetchPublishedAlbumById, unpublish } from "../../lib/publishedAlbums";
import { useParams, useLocation } from "react-router-dom";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { useFetch } from "../../hooks/api/useFetch";

export function useFetchAlbum(): UseQueryResult<Album | undefined> {
  const { id } = useParams<{ id: string }>();

  const s = useLocation().pathname.split("/")[2];

  const queryKey = s === "edit" ? "draft-album" : "published-album";

  const queryFn = s === "edit" ? fetchDraftAlbumById : fetchPublishedAlbumById;

  return useFetch([queryKey, id], () => queryFn(id));
}

export function useHandleDraftAlbum() {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: updateAlbumMutate } = useMutation(
    (album: UpdateAlbumDTO) => updateDraftAlbum(album)
  );

  const updateAlbum = async (album: UpdateAlbumDTO) => {
    try {
      await updateAlbumMutate(album);

      openMessageModalWithMessage("アルバムを更新しました。");
    } catch (error) {
      if (error instanceof Error) {
        openMessageModalWithMessage(error.message);
        return;
      }
    }
  };

  const { mutateAsync: unpublishAlbumMutate } = useMutation((albumId: string) =>
    unpublish(albumId)
  );

  const unpublishAlbum = async (albumId: string) => {
    try {
      await unpublishAlbumMutate(albumId);

      openMessageModalWithMessage("アルバムを非公開にしました。");
    } catch (error) {
      if (error instanceof Error) {
        openMessageModalWithMessage(error.message);
        return;
      }
    }
  };

  return { updateAlbum, unpublishAlbum };
}
