import { Link } from "react-router-dom";
import { BorderColor } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Album } from "@ufo-society1974/types";
import { ROLE } from "../../constants";

type ListItemProps = {
  album: Album;
  role: string;
  publicStatus: "draft" | "published";
};

export const AlbumListItem: React.FC<ListItemProps> = ({
  album,
  role,
  publicStatus,
}) => (
  <li className="album-item" key={album.id}>
    <p>{album.title}</p>
    <Link className="album-image" to={`/albums/detail/${album.id}`}>
      <img src={album.image} alt={"アルバムの画像"} />
    </Link>
    <div className="album-image-footer">
      {role === ROLE.EDITOR ? (
        <span>アルバムを編集する</span>
      ) : (
        <span>アルバムを閲覧する</span>
      )}
      <IconButton href={`/albums/edit/${album.id}?status=${publicStatus}`}>
        <BorderColor />
      </IconButton>
      <br />
      {role === ROLE.EDITOR ? (
        <span>アルバムの曲を編集する</span>
      ) : (
        <span>アルバムの曲を閲覧する</span>
      )}
      <IconButton href={`/albums/detail/${album.id}`}>
        <BorderColor />
      </IconButton>
    </div>
  </li>
);

type Props = {
  albums: Album[];
  role: string;
  publicStatus: "draft" | "published";
};

export const AlbumList: React.FC<Props> = (props) => {
  const { albums } = props;
  return (
    <ul className="album-list">
      {albums &&
        albums.map((album: Album) => (
          <AlbumListItem {...props} album={album} key={album.id} />
        ))}
    </ul>
  );
};
