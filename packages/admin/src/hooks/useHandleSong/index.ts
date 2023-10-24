import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useMessageModalState } from "../useMessageModalState";
import { createSong, updateSong, deleteSong } from "../../lib/songs";
import { CreateSongDTO, UpdateSongDTO } from "@ufo-society1974/types";

type ReturnType = {
  handleCrateSong: (albumId: string, data: CreateSongDTO) => Promise<void>;
  handleUpdateSong: (
    albumId: string,
    songId: string,
    data: UpdateSongDTO
  ) => Promise<void>;
  handleDeleteSong: (albumId: string, songId: string) => Promise<void>;
};

export function useHandleSong(): ReturnType {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: createSongMutate } = useMutation(
    ({ albumId, data }: { albumId: string; data: CreateSongDTO }) =>
      createSong(albumId, data)
  );

  const handleCrateSong: ReturnType["handleCrateSong"] = useCallback(
    async (albumId, data) => {
      try {
        await createSongMutate({ albumId, data });
        openMessageModalWithMessage("楽曲を作成しました。");
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [createSongMutate, openMessageModalWithMessage]
  );

  const { mutateAsync: updateSongMutate } = useMutation(
    ({
      albumId,
      songId,
      data,
    }: {
      albumId: string;
      songId: string;
      data: UpdateSongDTO;
    }) => updateSong(albumId, songId, data)
  );

  const handleUpdateSong: ReturnType["handleUpdateSong"] = useCallback(
    async (albumId, songId, data) => {
      try {
        await updateSongMutate({ albumId, songId, data });
        openMessageModalWithMessage("楽曲を更新しました。");
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [openMessageModalWithMessage, updateSongMutate]
  );

  const { mutateAsync: deleteSongMutate } = useMutation(
    ({ albumId, songId }: { albumId: string; songId: string }) =>
      deleteSong(albumId, songId)
  );

  const handleDeleteSong: ReturnType["handleDeleteSong"] = useCallback(
    async (albumId, songId) => {
      try {
        await deleteSongMutate({ albumId, songId });

        openMessageModalWithMessage("楽曲を削除しました。");
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [deleteSongMutate, openMessageModalWithMessage]
  );

  return { handleCrateSong, handleUpdateSong, handleDeleteSong };
}
