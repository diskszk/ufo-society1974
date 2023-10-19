import { Link } from "react-router-dom";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { AlbumInfo } from "../../components/songs";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { SongList } from "../../partials/SongList/SongList";
import { useFetchAlbum } from "../../hooks/api";
import { BackButton } from "../../components/UIKit/BackButton";
import { getApproved } from "../../lib/helpers/getApproved";
import { useStatus } from "../../hooks/useStatus";

/*
  /albums/(edit|preview)/:id/detail
*/
export const AlbumDetail: React.FC = () => {
  const [getStatus] = useStatus();
  const { status } = getStatus();

  const { signedInUser } = useSignedInUserState();

  const { data: album } = useFetchAlbum();

  const isApproved = getApproved({
    currentUserRole: signedInUser.role,
    approvedRole: ROLE.EDITOR,
    status,
  });

  const label = isApproved ? "アルバム編集" : "アルバム閲覧";

  return (
    <div className="page">
      <h1>アルバム詳細ページ</h1>
      <div className="spacing-div"></div>

      {album ? (
        <div>
          <div className="spacing-div"></div>
          <AlbumInfo album={album} />
          <SongList albumId={album.id} isApproved={isApproved} />

          <div className="button-container-row">
            <BackButton>もどる</BackButton>

            <Link to={`/albums/${status}/${album.id}`}>
              <StyledButton>{label}</StyledButton>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>アルバムが存在しません。</p>
          <BackButton>もどる</BackButton>
        </div>
      )}
    </div>
  );
};
