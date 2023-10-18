import { useParams } from "react-router-dom";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { AlbumInfo } from "../../components/songs";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { SongList } from "../../partials/SongList/SongList";
import { useFetch } from "../../hooks/api";
import { fetchDraftAlbumById } from "../../lib/draftAlbums";
import { BackButton } from "../../components/UIKit/BackButton";

/*
  /albums/edit/:id/detail
*/
export const EditAlbumDetail: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const { id } = useParams<{ id: string }>();

  const { data: album } = useFetch(["draft-album", id], () =>
    fetchDraftAlbumById(id)
  );

  const label =
    signedInUser.role === ROLE.EDITOR ? "アルバム編集" : "アルバム閲覧";

  const isApproved = signedInUser.role === ROLE.EDITOR;

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

            <StyledButton href={`/albums/edit/${album.id}`}>
              {label}
            </StyledButton>
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
