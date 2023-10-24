import { SongForm } from "../../partials/SongForm/SongForm";
import { useStatus } from "../../hooks/useStatus";
import { getApproved } from "../../helpers";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { ROLE } from "../../constants";
import { SubmitHandler } from "react-hook-form";
import { SongInput } from "../../schemas/songSchema";
import { useCallback } from "react";
import { useHandleSong, useMessageModalState } from "../../hooks";
import { useParams } from "react-router-dom";

/*
  /albums/edit/:albumId/detail/songs/new
*/
export const CreateSong: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const [getStatus] = useStatus();
  const { status } = getStatus();

  const isApproved = getApproved({
    currentUserRole: signedInUser.role,
    approvedRole: ROLE.EDITOR,
    status,
  });

  const { openMessageModalWithMessage } = useMessageModalState();
  const { handleCrateSong } = useHandleSong();

  const { id: albumId } = useParams<{ id: string }>();
  const onSubmit: SubmitHandler<SongInput> = useCallback(
    async (data) => {
      if (!isApproved) {
        openMessageModalWithMessage("権限がありません。");
      }

      await handleCrateSong(albumId, data);
    },
    [albumId, handleCrateSong, isApproved, openMessageModalWithMessage]
  );

  return (
    <div>
      <h1>曲を新規作成</h1>
      <SongForm onSubmit={onSubmit} isApproved={isApproved} />
    </div>
  );
};
