import { useDispatch } from "react-redux";
import { StyledAnchor, StyledTableCell, StyledTableRow } from "./styles";
import { createOpenErrorModalAction } from "../../../../store/ModalStatusReducer";
import { SongSummary } from "../../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSong } from "../../../../lib";
import { useCallback } from "react";

type Props = {
  albumId: string;
  songSummary: SongSummary;
};

export const SongListTableRow: React.FC<Props> = ({ albumId, songSummary }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ["song", songSummary.id],
    () => fetchSong(albumId, songSummary.id),
    {
      onError: () => {
        dispatch(
          createOpenErrorModalAction(
            "データの取得に失敗しました。\n通信環境をご確認の上再度お試しください。"
          )
        );
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["lyric-modal-data"], {
          isOpen: true,
          song: data,
        });
      },
    }
  );

  const handleClickSong = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <StyledTableRow key={songSummary.id}>
      <StyledTableCell
        sx={{ width: "5%" }}
        component="th"
        scope="row"
        align="right"
      >
        {songSummary.id}
      </StyledTableCell>
      <StyledTableCell>{songSummary.title}</StyledTableCell>
      <StyledTableCell>
        {/* クリックすると歌詞モーダルを表示する */}
        <StyledAnchor onClick={() => handleClickSong()}>歌詞</StyledAnchor>
      </StyledTableCell>
    </StyledTableRow>
  );
};
