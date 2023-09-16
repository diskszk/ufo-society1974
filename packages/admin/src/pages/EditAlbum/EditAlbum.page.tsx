import React, { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { AlbumInput } from "../../lib/schemas/albumSchema";
import { AlbumForm } from "../../partials/AlbumForm";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { useAlbum, useHandleDraftAlbum } from "./hooks";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { Album } from "@ufo-society1974/types";

type PresentationProps = {
  album: Album;
  isApproved: boolean;
  publicState: string;
};

export const Presentation: React.FC<PresentationProps> = ({
  album,
  isApproved,
  publicState,
}) => {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { updateAlbum, unpublishAlbum } = useHandleDraftAlbum();

  const onSubmit: SubmitHandler<AlbumInput> = useCallback(
    async (data) => {
      if (!isApproved) {
        openMessageModalWithMessage("権限がありません。");
      }

      await updateAlbum({
        ...data,
        id: album.id,
        image: data.imageFile,
      });

      return;
    },
    [album, isApproved, openMessageModalWithMessage, updateAlbum]
  );

  const handleUnpublish = useCallback(async () => {
    if (!isApproved) {
      openMessageModalWithMessage("権限がありません。");
    }
    await unpublishAlbum(album.id);

    return;
  }, [album.id, isApproved, openMessageModalWithMessage, unpublishAlbum]);

  return (
    <div className="album-edit">
      <h1>アルバムを編集</h1>
      <div>
        <AlbumForm
          onSubmit={onSubmit}
          isApproved={isApproved}
          currentValues={{
            ...album,
            imageFile: album.image,
          }}
        />
        {publicState === "published" && (
          <StyledButton onClick={handleUnpublish}>非公開に戻す</StyledButton>
        )}
      </div>
    </div>
  );
};

// /albums/edit/:id?status={draft || published}
export const EditAlbum: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const { album, publicState } = useAlbum();

  // 公開済みの場合編集できない
  const isApproved =
    signedInUser.role === ROLE.EDITOR && publicState === "draft";

  return (
    <>
      {album ? (
        <Presentation
          album={album}
          isApproved={isApproved}
          publicState={publicState}
        />
      ) : (
        <div className="album-edit">
          <h1>アルバムを編集</h1>

          <p>アルバムが存在しません。</p>
        </div>
      )}
    </>
  );
};
