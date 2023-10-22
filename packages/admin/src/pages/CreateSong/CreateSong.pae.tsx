import { SongForm } from "../../partials/SongForm/SongForm";
import { useStatus } from "../../hooks/useStatus";
import { getApproved } from "../../helpers";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { ROLE } from "../../constants";

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

  return (
    <div>
      <h1>曲を新規作成</h1>
      <SongForm onSubmit={() => void 0} isApproved={isApproved} />
    </div>
  );
};
