import { Link } from "react-router-dom";
import { BorderColor } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Album } from "@ufo-society1974/types";
import { PublicStatus, ROLE, RoleType } from "../../constants";

type Props = {
  albums: Album[];
  role: RoleType;
  publicStatus: PublicStatus;
};

export const AlbumList: React.FC<Props> = ({ albums, role, publicStatus }) => {
  const label = role === ROLE.EDITOR ? "編集" : "閲覧";

  return (
    <ul className="album-list">
      {albums.map((album: Album) => (
        <li className="album-item" key={album.id}>
          <p>{album.title}</p>
          <Link
            className="album-image"
            to={`/albums/detail/${album.id}?status=${publicStatus}`}
          >
            <img src={album.image} alt={"アルバムの画像"} />
          </Link>
          <div className="album-image-footer">
            <span>アルバムを{label}する</span>
            <IconButton
              href={`/albums/edit/${album.id}?status=${publicStatus}`}
            >
              <BorderColor />
            </IconButton>
            <br />
            <span>アルバムの曲を{label}する</span>
            <IconButton
              href={`/albums/detail/${album.id}?status=${publicStatus}`}
            >
              <BorderColor />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
  );
};
