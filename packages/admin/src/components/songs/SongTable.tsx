import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { SongTableBody } from "./";
import { RootStore } from "../../types";
import { Song } from "@ufo-society1974/types";
import { createUpdateSongsAction } from "../../store/SongsReducer";
import {
  createRequestFetchAction,
  crateSuccessFetchAction,
  createFailedFetchAction,
} from "../../store/LoadingStatusReducer";
import { getSongs } from "../../lib/_songs";
import { AddIconButton } from "../AddIconButton";

type PresentationProps = {
  href: string;
  songs: Song[];
};

export const Presentation: React.FC<PresentationProps> = ({ href, songs }) => {
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
              <TableCell>元ネタ</TableCell>
              <TableCell>再生</TableCell>
              <TableCell></TableCell>
              <TableCell
                sx={{
                  padding: 0,
                }}
              >
                <AddIconButton label="曲を追加" href={href} />
              </TableCell>
            </TableRow>
          </TableHead>
          <SongTableBody songs={songs} />
        </Table>
      </TableContainer>
    </div>
  );
};

type Props = {
  albumId: string;
};

export const SongTable: React.FC<Props> = ({ albumId }) => {
  const dispatch = useDispatch();

  const songs = useSelector<RootStore, Song[]>((state) => state.songs);

  useEffect(() => {
    async function fetch() {
      const dataList: Song[] = await getSongs(albumId);

      dispatch(createUpdateSongsAction(dataList));
    }

    try {
      dispatch(createRequestFetchAction());
      fetch();
      dispatch(crateSuccessFetchAction());
    } catch {
      dispatch(
        createFailedFetchAction(
          "曲の取得に失敗しました。\n通信環境をご確認の上再度お試しください。"
        )
      );
    }
  }, [dispatch, albumId]);

  return (
    <Presentation href={`albums/detail/${albumId}/edit/new`} songs={songs} />
  );
};
