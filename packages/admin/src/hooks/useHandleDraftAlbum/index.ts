import { useMutation } from "@tanstack/react-query";
import { CreateAlbumDTO, UpdateAlbumDTO } from "@ufo-society1974/types";
import { createDraftAlbum, updateDraftAlbum } from "../../lib/draftAlbums";
import { unpublish } from "../../lib/publishedAlbums";
import { useMessageModalState } from "../useMessageModalState";
import { useCallback } from "react";
import { AlbumInput } from "../../schemas/albumSchema";

export function useHandleDraftAlbum() {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: createAlbumMutate } = useMutation(
    (album: CreateAlbumDTO) => createDraftAlbum(album)
  );

  const handleCreateAlbum = useCallback(
    async (data: AlbumInput) => {
      try {
        await createAlbumMutate({ ...data, image: data.imageFile });
        openMessageModalWithMessage("アルバムを作成しました。");
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [createAlbumMutate, openMessageModalWithMessage]
  );

  const { mutateAsync: updateAlbumMutate } = useMutation(
    (album: UpdateAlbumDTO) => updateDraftAlbum(album)
  );

  const updateAlbum = useCallback(
    async (album: UpdateAlbumDTO) => {
      try {
        await updateAlbumMutate(album);

        openMessageModalWithMessage("アルバムを更新しました。");
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [openMessageModalWithMessage, updateAlbumMutate]
  );

  const { mutateAsync: unpublishAlbumMutate } = useMutation((albumId: string) =>
    unpublish(albumId)
  );

  const unpublishAlbum = useCallback(
    async (albumId: string) => {
      try {
        await unpublishAlbumMutate(albumId);

        openMessageModalWithMessage("アルバムを非公開にしました。");
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [openMessageModalWithMessage, unpublishAlbumMutate]
  );

  return { handleCreateAlbum, updateAlbum, unpublishAlbum };
}
