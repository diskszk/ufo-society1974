import { SubmitHandler } from "react-hook-form";
import { AlbumInput } from "../lib/schemas/albumSchema";
import { AlbumForm } from "../partials/AlbumForm";
import { ROLE } from "../constants";
import { useSignedInUserState } from "../hooks/useSignedInUserState";
import { useMessageModalState } from "../hooks/useMessageModalState";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAlbumById } from "../lib/albums";
import { Album } from "@ufo-society1974/types";

// /albums/:id
export const EditAlbum: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const { openMessageModalWithMessage } = useMessageModalState();

  const onSubmit: SubmitHandler<AlbumInput> = async (_data) => {
    if (signedInUser.role !== ROLE.EDITOR) {
      openMessageModalWithMessage("権限がありません。");
    }

    return;
  };

  // urlからidを取得する
  const { id } = useParams<{ id: string }>();

  // idをもとに該当するalbumをfetchする
  const { data: album } = useQuery<Album>([], () => fetchAlbumById(id));

  return (
    <div className="album-edit">
      <h1>アルバムを編集</h1>
      {album ? (
        <AlbumForm onSubmit={onSubmit} role={signedInUser.role} album={album} />
      ) : (
        <p>アルバムが存在しません。</p>
      )}
    </div>
  );
};
