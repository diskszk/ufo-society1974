import { Link } from "react-router-dom";
import { Album } from "../../../../types";
import { StyledList, StyledImage, StyledParagraph } from "./styles";

type ComponentProps = {
  album: Album;
};

export const Component: React.FC<ComponentProps> = ({ album }) => (
  <StyledList data-testid="loaded">
    <Link to={`/detail/${album.id}`}>
      <StyledImage src={album.imageFile.path} alt={album.title} />
      <StyledParagraph>{album.title}</StyledParagraph>
    </Link>
  </StyledList>
);

type Props = {
  album: Album;
};
export const AlbumListItem: React.FC<Props> = ({ album }) => {
  return <Component album={album} />;
};
