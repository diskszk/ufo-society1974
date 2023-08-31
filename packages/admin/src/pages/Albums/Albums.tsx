import { StyledButton } from "../../components/UIKit/CustomButton";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { AddIconButton } from "../../components/AddIconButton";
import { AlbumList } from "../../partials/AlbumList";
import { StyledSubHeading } from "./styles";
import { useAlbums } from "./hooks";
import { Album, User } from "@ufo-society1974/types";

type PresentationProps = {
  draftAlbums: Album[];
  publishedAlbums: Album[];
  signedInUser: User;
};

export const Presentation: React.FC<PresentationProps> = ({
  draftAlbums,
  publishedAlbums,
  signedInUser,
}) => {
  const isApprovedUser = signedInUser.role === ROLE.EDITOR;

  return (
    <div className="page">
      <h1>アルバムの管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>

      <div className="album-container">
        <div>
          <StyledSubHeading>未公開のアルバム</StyledSubHeading>
          <div className="add-icon-button">
            {isApprovedUser && (
              <AddIconButton label="アルバムを追加" href="/albums/create" />
            )}
          </div>
          <AlbumList
            albums={draftAlbums}
            role={signedInUser.role}
            publicStatus="draft"
          />
        </div>
        <hr />
        <div>
          <StyledSubHeading>公開中のアルバム</StyledSubHeading>
          <AlbumList
            albums={publishedAlbums}
            role={signedInUser.role}
            publicStatus="published"
          />
        </div>

        <div className="spacing-div"></div>

        <div className="button-container-row">
          <StyledButton href="/">もどる</StyledButton>
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
      signedInUser={signedInUser}
    />
  );
};
