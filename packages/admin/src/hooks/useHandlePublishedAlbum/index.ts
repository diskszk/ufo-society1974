import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { unpublish } from "../../lib/publishedAlbums";
import { useMessageModalState } from "../useMessageModalState";

type ReturnType = {
  unpublishAlbum: (albumId: string) => Promise<void>;
};

export function useHandlePublishedAlbum(): ReturnType {
  const { openMessageModalWithMessage } = useMessageModalState();

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

  return { unpublishAlbum };
}
