import { useMutation } from "@tanstack/react-query";
import { UseFormSetValue } from "react-hook-form";
import { useMessageModalState } from "../../hooks/useMessageModalState";
import { AlbumInput } from "../../lib/schemas/albumSchema";
import { uploadImage } from "../../lib/storages";

export function useImageUpload() {
  const { openMessageModalWithMessage } = useMessageModalState();

  const { mutateAsync: uploadImageMutate } = useMutation(
    ({ file, filename }: { file: File; filename: string }) =>
      uploadImage(file, filename)
  );

  const upload = async (
    file: File,
    setValue: UseFormSetValue<AlbumInput>,
    isApproved: boolean
  ) => {
    if (!isApproved) {
      openMessageModalWithMessage("画像をアップロードする権限がありません。");
      return;
    }

    try {
      const { downLoadURL } = await uploadImageMutate({
        file,
        filename: file.name,
      });

      // アップロードボタンのクリックでRHF上のimageFileを変更する
      setValue("imageFile", downLoadURL);
    } catch {
      openMessageModalWithMessage("サーバーでエラーが発生しました。");
    }
  };

  return { upload };
}
