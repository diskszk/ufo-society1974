import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Album, UpdateAlbumDTO } from "@ufo-society1974/types";
import { fetchDraftAlbumById, updateDraftAlbum } from "../../lib/draftAlbums";
import { fetchPublishedAlbumById, unpublish } from "../../lib/publishedAlbums";
import { useParams, useLocation } from "react-router-dom";
import { useMessageModalState } from "../../hooks/useMessageModalState";

export function useAlbum(): {
  album: Album | undefined;
  publicState: string;
} {
  const { id } = useParams<{ id: string }>();

  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  const publicState = query.get("status");

  const { refetch: queryDraftAlbum } = useQuery<Album | undefined>(
    ["draft-album", id],
    {
      queryFn: () => fetchDraftAlbumById(id),
      enabled: false,
    }
  );
  const { refetch: queryPublishedAlbum } = useQuery<Album>(
    ["published-album", id],
    {
      queryFn: () => fetchPublishedAlbumById(id),
      enabled: false,
    }
  );

  const [album, setAlbum] = useState<Album | undefined>();

  useEffect(() => {
    const set = async () => {
      let album: Album | undefined = undefined;
      if (publicState === "draft") {
        const { data } = await queryDraftAlbum();
        album = data;
      } else if (publicState === "published") {
        const { data } = await queryPublishedAlbum();
        album = data;
      }
      setAlbum(album);
    };

    set();
  }, [publicState, queryDraftAlbum, queryPublishedAlbum]);

  return { album, publicState: publicState || "" };
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
