import { StyledButton } from "../../components/UIKit/CustomButton";
import { AlbumInfo } from "../../components/songs";
import { PublicStatus, ROLE, RoleType } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { SongList } from "../../partials/SongList/SongList";
import { useAlbum } from "../EditAlbum/hooks";

function getLabel(
  role: RoleType,
  publicStatus: PublicStatus
): "アルバム編集" | "アルバム閲覧" {
  return role === ROLE.EDITOR && publicStatus === "draft"
    ? "アルバム編集"
    : "アルバム閲覧";
}

/*
  /albums/:albumId?status={draft|published}/detail
  albumId内のSong一覧 
*/
export const Songs: React.FC = () => {
  const { signedInUser } = useSignedInUserState();
  const { album, publicStatus } = useAlbum();

  if (!album) {
    return (
      <div>
        <p>アルバムが存在しません。</p>
        <StyledButton href="/albums">もどる</StyledButton>
      </div>
    );
  }

  const label = getLabel(signedInUser.role, publicStatus);
  return (
    <div className="page">
      <h1>曲の管理ページ</h1>
      <div className="spacing-div"></div>

      <div>
        <div className="spacing-div"></div>
        <AlbumInfo album={album} />
        <SongList albumId={album.id} role={signedInUser.role} />

        <div className="button-container-row">
          <StyledButton href="/albums">もどる</StyledButton>
          <StyledButton href={`/albums/edit/${album.id}`}>{label}</StyledButton>
        </div>
      </div>
    </div>
  );
};
