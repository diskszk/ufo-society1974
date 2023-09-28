import { TableRow, TableCell } from "@mui/material";
import { Song } from "@ufo-society1974/types";
import { PublicStatus, ROLE, RoleType } from "../../constants";
import { Link } from "react-router-dom";
import { useCallback } from "react";

type Props = {
  song: Song;
  albumId: string;
  role: RoleType;
  publicStatus: PublicStatus;
};

export const SongListItem: React.FC<Props> = ({ song, albumId, role }) => {
  const handleDeleteSong = useCallback(() => {
    return;
  }, []);

  return (
    <TableRow key={song.id}>
      <TableCell align="right" component="th" scope="row">
        {song.id}
      </TableCell>
      <TableCell>{song.title}</TableCell>

      <TableCell
        sx={{
          cursor: "pointer",
        }}
      >
        <Link to={`/albums/detail/${albumId}/edit/${song.id}`}>
          {role === ROLE.EDITOR ? "編集" : "閲覧"}
        </Link>
      </TableCell>
      <TableCell
        sx={{
          cursor: "pointer",
        }}
        role="button"
        onClick={handleDeleteSong}
      >
        削除
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};
