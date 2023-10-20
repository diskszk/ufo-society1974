import { useMutation } from "@tanstack/react-query";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { deleteSong } from "../../lib/songs";

export function useHandleSong() {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: deleteSongMutate } = useMutation(
    ({ albumId, songId }: { albumId: string; songId: string }) =>
      deleteSong(albumId, songId)
  );

  const handleDeleteSong = async (
    albumId: string,
    songId: string,
    songTitle: string
  ) => {
    try {
      await deleteSongMutate({ albumId, songId });
      openMessageModalWithMessage(`${songTitle}を削除しました。`);
    } catch {
      openMessageModalWithMessage(`${songTitle}の削除に失敗しました。`);
    }
  };

  return { handleDeleteSong };
}
