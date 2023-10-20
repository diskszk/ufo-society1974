import { TableRow, TableCell } from "@mui/material";
import { Song } from "@ufo-society1974/types";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { Status } from "../../types";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { useHandleSong } from "./hooks";

type Props = {
  song: Song;
  albumId: string;
  isApproved: boolean;
  status: Status;
};

export const SongListItem: React.FC<Props> = ({
  song,
  albumId,
  isApproved,
  status,
}) => {
  const { openMessageModalWithMessage } = useMessageModalState();
  const { handleDeleteSong } = useHandleSong();

  const handleClick = useCallback(async () => {
    if (!isApproved) {
      openMessageModalWithMessage("権限がありません。");
      return;
    }

    if (!window.confirm(`${song.title}を削除しますか？`)) {
      return;
    }

    await handleDeleteSong(albumId, song.id, song.title);

    return;
  }, [
    albumId,
    handleDeleteSong,
    isApproved,
    openMessageModalWithMessage,
    song.id,
    song.title,
  ]);

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
        <Link to={`/albums/${status}/${albumId}/detail/${song.id}`}>
          {isApproved ? "編集" : "閲覧"}
        </Link>
      </TableCell>
      {isApproved && (
        <TableCell
          sx={{
            cursor: "pointer",
          }}
          role="button"
          onClick={handleClick}
        >
          削除
        </TableCell>
      )}
      <TableCell></TableCell>
    </TableRow>
  );
};
