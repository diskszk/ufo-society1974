import { useParams } from "react-router-dom";
import { SongForm } from "../../partials/SongForm/SongForm";
import { useFetch } from "../../hooks/api";
import { fetchSongById } from "../../lib/songs";
import { useStatus } from "../../hooks/useStatus";
import { getApproved } from "../../helpers";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { ROLE } from "../../constants";
import { SongInput } from "../../schemas/songSchema";
import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { useHandleSong } from "../../hooks/useHandleSong";
import { UpdateSongDTO } from "@ufo-society1974/types";

/*
  /albums/(edit|preview)/:albumId/detail/:songId
*/
export const EditSong: React.FC = () => {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { id: albumId, songId } = useParams<{ id: string; songId: string }>();

  const { data: song } = useFetch(["song", songId], () =>
    fetchSongById(albumId, songId)
  );

  const { signedInUser } = useSignedInUserState();

  const [getStatus] = useStatus();
  const { status } = getStatus();

  const isApproved = getApproved({
    currentUserRole: signedInUser.role,
    approvedRole: ROLE.EDITOR,
    status,
  });

  const { handleUpdateSong } = useHandleSong();

  const onSubmit: SubmitHandler<SongInput> = useCallback(
    async (data) => {
      if (!isApproved) {
        openMessageModalWithMessage("権限がありません。");
      }

      const updateSongDTO: UpdateSongDTO = {
        ...data,
        id: data.trackId.toString(),
      };

      await handleUpdateSong(albumId, songId, updateSongDTO);
    },
    [albumId, handleUpdateSong, isApproved, openMessageModalWithMessage, songId]
  );

  const label = isApproved ? "編集" : "閲覧";

  return (
    <div>
      <h1>曲を{label}</h1>
      {song ? (
        <SongForm
          onSubmit={onSubmit}
          isApproved={isApproved}
          currentValues={{ ...song, trackId: Number(song.id) }}
        />
      ) : (
        <p>楽曲が存在しません。</p>
      )}
    </div>
  );
};
