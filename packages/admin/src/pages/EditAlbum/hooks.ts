import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Album } from "@ufo-society1974/types";
import { fetchDraftAlbumById } from "../../lib/draftAlbums";
import { fetchPublishedAlbumById } from "../../lib/publishedAlbums";
import { useParams, useLocation } from "react-router-dom";

export function useAlbum(): { album: Album | undefined } {
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

  return { album };
}
