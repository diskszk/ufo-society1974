import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { AddIconButton } from "../../components/AddIconButton";
import { AlbumList } from "../../partials/AlbumList";
import { StyledSubHeading } from "./styles";
import { useAlbums } from "./hooks";
import { Album } from "@ufo-society1974/types";
import { RoleType } from "../../types";
import { BackButton } from "../../components/UIKit/BackButton";
import { Link } from "react-router-dom";

type PresentationProps = {
  draftAlbums: Album[];
  publishedAlbums: Album[];
  role: RoleType;
};

export const Presentation: React.FC<PresentationProps> = ({
  draftAlbums,
  publishedAlbums,
  role,
}) => {
  const isApprovedUser = role === ROLE.EDITOR;

  return (
    <div className="page">
      <h1>アルバムの管理ページ</h1>
      <div className="album-container">
        <div>
          <StyledSubHeading>未公開のアルバム</StyledSubHeading>
          <div className="add-icon-button">
            {isApprovedUser && (
              <Link to="/albums/create">
                <AddIconButton label="アルバムを追加" />
              </Link>
            )}
          </div>
          <AlbumList albums={draftAlbums} role={role} status="edit" />
        </div>
        <hr />
        <div>
          {/* TODO: 公開中のアルバムを公開する機能を追加する */}
          <StyledSubHeading>公開中のアルバム</StyledSubHeading>
          <AlbumList albums={publishedAlbums} role={role} status="preview" />
        </div>

        <div className="spacing-div"></div>

        <div className="button-container-row">
          <BackButton>もどる</BackButton>
        </div>
      </div>
    </div>
  );
};

export const Albums: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const { draftAlbums, publishedAlbums } = useAlbums();

  return (
    <Presentation
      draftAlbums={draftAlbums}
      publishedAlbums={publishedAlbums}
      role={signedInUser.role}
    />
  );
};
