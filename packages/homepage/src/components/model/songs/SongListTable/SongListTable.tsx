// TODO: styled -> emotion 化

import { Table, TableBody, TableContainer, Paper } from "@mui/material";
import { AlbumInfo } from "../../../../types";
import { SongListTableRow } from "../SongListTableRow";

type ComponentProps = {
  albumInfo: AlbumInfo;
};

export const SongListTable: React.FC<ComponentProps> = ({ albumInfo }) => (
  // 子コンポーネントにmarginをもたせたくない
  <TableContainer sx={{ width: "80%", m: "0 auto" }} component={Paper}>
    <Table aria-label="customized table">
      <TableBody data-testid="loaded">
        {albumInfo.songSummaries.map((songSummary) => (
          <SongListTableRow
            albumId={albumInfo.albumId}
            songSummary={songSummary}
            key={songSummary.id}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
