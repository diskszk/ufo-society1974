import { Link } from "react-router-dom";
import { StyledButton } from "../../components/UIKit/StyledButton";
import { AlbumInfo } from "../../components/songs";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { SongList } from "../../partials/SongList/SongList";
import { useFetchAlbum } from "../../hooks/api";
import { BackButton } from "../../components/UIKit/BackButton";
import { getApproved } from "../../helpers";
import { useStatus } from "../../hooks/useStatus";
import { useCallback } from "react";
import { useHandleDraftAlbum } from "../../hooks/useHandleDraftAlbum";
import { useHandlePublishedAlbum } from "../../hooks/useHandlePublishedAlbum";
import { useMessageModalState } from "../../hooks/useMessageModalState";

/*
  /albums/(edit|preview)/:id/detail
*/
export const AlbumDetail: React.FC = () => {
  const { openMessageModalWithMessage } = useMessageModalState();

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

  const { publishAlbum } = useHandleDraftAlbum();

  const handleClickPublishButton = useCallback(async () => {
    if (!album) {
      return;
    }
    if (signedInUser.role !== ROLE.EDITOR) {
      openMessageModalWithMessage("権限がありません。");
      return;
    }
    if (!window.confirm(`${album.title}を公開しますか？`)) {
      return;
    }

    await publishAlbum(album.id);
  }, [album, openMessageModalWithMessage, publishAlbum, signedInUser.role]);

  const { unpublishAlbum } = useHandlePublishedAlbum();

  const handleClickUnpublishButton = useCallback(async () => {
    if (!album) {
      return;
    }
    if (signedInUser.role !== ROLE.EDITOR) {
      openMessageModalWithMessage("権限がありません。");
      return;
    }
    if (!window.confirm(`${album.title}を非公開にしますか？`)) {
      return;
    }

    await unpublishAlbum(album.id);
  }, [album, openMessageModalWithMessage, signedInUser.role, unpublishAlbum]);

  return (
    <div className="page">
      <h1>アルバム詳細ページ</h1>
      <div className="spacing-div"></div>

      {album ? (
        <div>
          <div className="spacing-div"></div>
          <AlbumInfo album={album} />
          <SongList
            albumId={album.id}
            isApproved={isApproved}
            status={status}
          />

          <div className="button-container-row">
            <BackButton>もどる</BackButton>

            <Link to={`/albums/${status}/${album.id}`}>
              <StyledButton>{label}</StyledButton>
            </Link>

            {signedInUser.role === ROLE.EDITOR && (
              <>
                {status === "edit" ? (
                  <StyledButton onClick={handleClickPublishButton}>
                    アルバムを公開する
                  </StyledButton>
                ) : (
                  <StyledButton onClick={handleClickUnpublishButton}>
                    アルバムを非公開にする
                  </StyledButton>
                )}
              </>
            )}
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
