import { useQuery } from "@tanstack/react-query";
import { fetchSongs } from "../../lib/songs";
import { Song } from "@ufo-society1974/types";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import { AddIconButton } from "../../components/AddIconButton";
import { SongListItem } from "./SongListItem";
import { Link } from "react-router-dom";
import { Status } from "../../types";

type Props = {
  albumId: string;
  isApproved: boolean;
  status: Status;
};

export const SongList: React.FC<Props> = ({ albumId, isApproved, status }) => {
  const { data: songs } = useQuery<Song[]>(["songs"], () =>
    fetchSongs(albumId)
  );

  if (!songs) {
    return <p>楽曲が存在しません。</p>;
  }

  return (
    <div className="song-table">
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="right">No.</TableCell>
              <TableCell>タイトル</TableCell>

              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell
                sx={{
                  padding: 0,
                }}
              >
                {isApproved && (
                  <Link to={`/albums/edit/${albumId}/detail/new`}>
                    <AddIconButton label="曲を追加" />
                  </Link>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map((song) => (
              <SongListItem
                key={song.id}
                song={song}
                albumId={albumId}
                isApproved={isApproved}
                status={status}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
