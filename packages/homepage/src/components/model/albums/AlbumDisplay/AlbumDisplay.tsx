import { Album } from "../../../../types";
import { FaBandcamp } from "react-icons/fa";
import {
  StyledContainer,
  StyledImage,
  StyledDiv,
  StyledAnchor,
} from "./styles";

type Props = {
  album: Album;
};

export const AlbumDisplay: React.FC<Props> = ({ album }) => {
  return (
    <>
      <StyledContainer>
        <StyledImage src={album.imageFile.path} alt={album.title} />
      </StyledContainer>
      <StyledDiv>
        {album.bandcampUrl && (
          <StyledAnchor
            href={album.bandcampUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaBandcamp />
            bandcampで購入する
          </StyledAnchor>
        )}
      </StyledDiv>
    </>
  );
};
