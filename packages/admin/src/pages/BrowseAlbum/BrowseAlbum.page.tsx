import { useParams } from "react-router-dom";
import { AlbumForm } from "../../partials/AlbumForm";
import { useFetchPublishedAlbumById } from "./hooks";

/*  
  /albums/browse/:id
  SPEC: 公開済みのみ表示する
*/
export const BrowseAlbum: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { album } = useFetchPublishedAlbumById(id);

  return (
    <div className="album-edit">
      <h1>アルバムを編集</h1>
      {album ? (
        <div>
          <AlbumForm
            onSubmit={() => void 0}
            isApproved={false}
            currentValues={{
              ...album,
              imageFile: album.image,
            }}
          />
        </div>
      ) : (
        <p>アルバムが存在しません。</p>
      )}
    </div>
  );
};
