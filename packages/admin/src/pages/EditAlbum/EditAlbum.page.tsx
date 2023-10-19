import React, { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import { AlbumInput } from "../../lib/schemas/albumSchema";
import { AlbumForm } from "../../partials/AlbumForm";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { useHandleDraftAlbum } from "./hooks";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { Album } from "@ufo-society1974/types";
import { getApproved } from "../../lib/helpers/getApproved";
import { useFetchAlbum } from "../../hooks/api";
import { useStatus } from "../../hooks/useStatus";

type PresentationProps = {
  album: Album;
  isApproved: boolean;
};

const Presentation: React.FC<PresentationProps> = ({ album, isApproved }) => {
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
    <div>
      <AlbumForm
        onSubmit={onSubmit}
        isApproved={isApproved}
        currentValues={{
          ...album,
          imageFile: album.image,
        }}
      />
      {isApproved && (
        <StyledButton onClick={handleUnpublish}>非公開に戻す</StyledButton>
      )}
    </div>
  );
};

/* 
  /albums/(edit|preview)/:id
  urlから編集か閲覧かを取得する
 */
export const EditAlbum: React.FC = () => {
  const { signedInUser } = useSignedInUserState();

  const { data: album } = useFetchAlbum();

  const [getStatus] = useStatus();
  const { status } = getStatus();

  const isApproved = getApproved({
    currentUserRole: signedInUser.role,
    approvedRole: ROLE.EDITOR,
    status,
  });

  const label = isApproved ? "編集" : "閲覧";

  return (
    <div className="album-edit">
      <h1>アルバムを{label}</h1>
      {album ? (
        <Presentation album={album} isApproved={isApproved} />
      ) : (
        <p>アルバムが存在しません。</p>
      )}
    </div>
  );
};
