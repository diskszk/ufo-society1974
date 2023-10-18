import { useMutation } from "@tanstack/react-query";
import { UpdateAlbumDTO } from "@ufo-society1974/types";
import { updateDraftAlbum } from "../../lib/draftAlbums";
import { unpublish } from "../../lib/publishedAlbums";
import { useMessageModalState } from "../../hooks/useMessageModalState";

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
