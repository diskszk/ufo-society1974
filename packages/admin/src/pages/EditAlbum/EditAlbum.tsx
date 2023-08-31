import React from "react";
import { SubmitHandler } from "react-hook-form";
import { AlbumInput } from "../../lib/schemas/albumSchema";
import { AlbumForm } from "../../partials/AlbumForm";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { useAlbum } from "./hooks";

// /albums/edit/:id?status={draft || published}
export const EditAlbum: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const { openMessageModalWithMessage } = useMessageModalState();

  const onSubmit: SubmitHandler<AlbumInput> = async (_data) => {
    if (signedInUser.role !== ROLE.EDITOR) {
      openMessageModalWithMessage("権限がありません。");
    }

    return;
  };

  const { album } = useAlbum();

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
