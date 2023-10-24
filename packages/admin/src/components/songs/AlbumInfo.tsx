import { Album } from "@ufo-society1974/types";

type Props = {
  album: Album;
};
export const AlbumInfo: React.FC<Props> = ({ album }) => {
  return (
    <div className="songs-album-info">
      <div className="songs-album-info-image">
        <img src={album.image} alt="アルバムのジャケット画像" />
      </div>
      <div className="songs-album-info-detail">
        <p>{album.title}</p>
        <p>リリース日: {album.publishedDate}</p>
      </div>
    </div>
  );
};
