import { Album } from "../../../../types";
import { AlbumListItem } from "../AlbumListItem";
import { StyledUl } from "./styles";

type Props = {
  albums: Album[];
};

export const AlbumList: React.FC<Props> = ({ albums }) => {
  return (
    <StyledUl>
      {albums &&
        albums.map((album: Album, key) => {
          return <AlbumListItem album={album} key={key} />;
        })}
    </StyledUl>
  );
};
