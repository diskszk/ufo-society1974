import { AlbumInput } from "../../schemas/albumSchema";
import { useMutation } from "@tanstack/react-query";
import { createDraftAlbum } from "../../lib/draftAlbums";
import { useCallback } from "react";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { CreateAlbumDTO } from "@ufo-society1974/types";

export function useCreateAlbum() {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: createAlbumMutate } = useMutation(
    (album: CreateAlbumDTO) => createDraftAlbum(album)
  );

  const handleCreateAlbum = useCallback(
    async (data: AlbumInput) => {
      try {
        await createAlbumMutate({ ...data, image: data.imageFile });
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [createAlbumMutate, openMessageModalWithMessage]
  );

  return { handleCreateAlbum };
}
