import { Button } from "../../../ui/Button";
import { Song } from "../../../../types";
import { Component as ModalWrapper } from "../../../common/Modal/ModalWrapper";
import { StyledContent } from "../../../common/Modal/styles";
import {
  StyledCopyRightArea,
  StyledSpace,
  StyledSubHeading,
  StyledLyricNote,
} from "./styles";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

type ComponentProps = {
  song: Song;
  handleClose: () => void;
};

export const Component: React.FC<ComponentProps> = ({ song, handleClose }) => (
  <StyledContent>
    <StyledSubHeading>{song.title}</StyledSubHeading>
    <StyledLyricNote>
      <p className="lyric">{song.lyric}</p>
    </StyledLyricNote>
    <StyledCopyRightArea>
      <p>{`Lyrics by    ${song.wordsRights}`}</p>
      <p>{`Composed by  ${song.musicRights}`}</p>
    </StyledCopyRightArea>
    <StyledSpace />
    <Button label="とじる" handleClick={handleClose} />
  </StyledContent>
);

type Props = {
  song: Song;
};

export const SongModal: React.FC<Props> = ({ song }) => {
  const queryClient = useQueryClient();

  const handleClose = useCallback(() => {
    queryClient.setQueryData(["lyric-modal-data"], {
      isOpen: false,
      song: null,
    });
  }, [queryClient]);

  return (
    <ModalWrapper>
      <Component song={song} handleClose={handleClose} />
    </ModalWrapper>
  );
};
