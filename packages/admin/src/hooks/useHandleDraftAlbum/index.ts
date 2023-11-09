import { useMutation } from "@tanstack/react-query";
import { CreateAlbumDTO, UpdateAlbumDTO } from "@ufo-society1974/types";
import {
  createDraftAlbum,
  publish,
  updateDraftAlbum,
} from "../../lib/draftAlbums";
import { useMessageModalState } from "../useMessageModalState";
import { useCallback } from "react";
import { AlbumInput } from "../../schemas/albumSchema";

type ReturnType = {
  createAlbum: (data: AlbumInput) => Promise<void>;
  updateAlbum: (data: UpdateAlbumDTO) => Promise<void>;
  publishAlbum: (id: string) => Promise<void>;
};

export function useHandleDraftAlbum(): ReturnType {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: createAlbumMutate } = useMutation(
    (album: CreateAlbumDTO) => createDraftAlbum(album)
  );

  const createAlbum: ReturnType["createAlbum"] = useCallback(
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

  const updateAlbum: ReturnType["updateAlbum"] = useCallback(
    async (data: UpdateAlbumDTO) => {
      try {
        await updateAlbumMutate(data);

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

  const { mutateAsync: publishAlbumMutate } = useMutation((id: string) =>
    publish(id)
  );

  const publishAlbum: ReturnType["publishAlbum"] = useCallback(
    async (id: string) => {
      try {
        await publishAlbumMutate(id);
        openMessageModalWithMessage("アルバムを公開しました。");
      } catch (error) {
        if (error instanceof Error) {
          openMessageModalWithMessage(error.message);
          return;
        }
      }
    },
    [openMessageModalWithMessage, publishAlbumMutate]
  );

  return { createAlbum, updateAlbum, publishAlbum };
}
