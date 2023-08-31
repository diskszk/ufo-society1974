import { AlbumInput } from "../../lib/schemas/albumSchema";
import { useMutation } from "@tanstack/react-query";
import { createDraftAlbum } from "../../lib/draftAlbums";
import { useCallback } from "react";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { CreateAlbumDTO } from "@ufo-society1974/types";
import { uploadImage } from "../../lib/storages";

export function useCreateAlbum() {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: uploadImageMutate } = useMutation(
    ({ fileList }: { fileList: FileList }) => uploadImage(fileList)
  );

  const { mutateAsync: createAlbumMutate } = useMutation(
    (album: CreateAlbumDTO) => createDraftAlbum(album)
  );

  const handleCreateAlbum = useCallback(
    async (data: AlbumInput) => {
      try {
        const { downLoadURL } = await uploadImageMutate({
          fileList: data.imageFile,
        });

        await createAlbumMutate({ ...data, image: downLoadURL });
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [createAlbumMutate, openMessageModalWithMessage, uploadImageMutate]
  );

  return { handleCreateAlbum };
}
