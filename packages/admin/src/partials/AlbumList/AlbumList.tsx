import { Link } from "react-router-dom";
import { BorderColor } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Album } from "@ufo-society1974/types";
import { ROLE } from "../../constants";
import { getApproved } from "../../lib/helpers/getApproved";
import { RoleType, Status } from "../../types";

type ListItemProps = {
  album: Album;
  label: string;
  status: Status;
};
export const AlbumListItem: React.FC<ListItemProps> = ({
  album,
  label,
  status,
}) => (
  <li className="album-item" key={album.id}>
    <p>{album.title}</p>
    <Link className="album-image" to={`/albums/${status}/${album.id}`}>
      <img src={album.image} alt={"アルバムの画像"} />
    </Link>
    <div className="album-image-footer">
      <span>アルバムを{label}する</span>
      <Link to={`/albums/${status}/${album.id}`}>
        <IconButton>
          <BorderColor />
        </IconButton>
      </Link>
      <br />
      <span>アルバムの詳細を{label}する</span>
      <Link to={`/albums/${status}/${album.id}/detail`}>
        <IconButton>
          <BorderColor />
        </IconButton>
      </Link>
    </div>
  </li>
);

type Props = {
  albums: Album[];
  role: RoleType;
  status: Status;
};

export const AlbumList: React.FC<Props> = ({ albums, role, status }) => {
  const label = getApproved({
    currentUserRole: role,
    approvedRole: ROLE.EDITOR,
    status,
  })
    ? "編集"
    : "閲覧";

  return (
    <ul className="album-list">
      {albums.map((album: Album) => (
        <AlbumListItem
          key={album.id}
          album={album}
          label={label}
          status={status}
        />
      ))}
    </ul>
  );
};
