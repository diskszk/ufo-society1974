import { SubmitHandler } from "react-hook-form";
import { AlbumInput } from "../../schemas/albumSchema";
import { AlbumForm } from "../../partials/AlbumForm";
import { ROLE } from "../../constants";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { useHandleDraftAlbum } from "../../hooks/useHandleDraftAlbum";

// /albums/create
export const CreateAlbum: React.FC = () => {
  const { createAlbum } = useHandleDraftAlbum();
  const { signedInUser } = useSignedInUserState();

  const { openMessageModalWithMessage } = useMessageModalState();

  const isApproved = signedInUser.role === ROLE.EDITOR;

  const onSubmit: SubmitHandler<AlbumInput> = async (data) => {
    if (!isApproved) {
      openMessageModalWithMessage("権限がありません。");
    }

    await createAlbum(data);

    return;
  };

  return (
    <div className="album-edit">
      <h1>アルバムを追加</h1>
      <AlbumForm onSubmit={onSubmit} isApproved={isApproved} />
    </div>
  );
};
