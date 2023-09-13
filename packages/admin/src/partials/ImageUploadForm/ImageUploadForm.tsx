import { useCallback, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { AlbumInput } from "../../lib/schemas/albumSchema";
import { NO_IMAGE } from "../../constants";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../lib/storages";
import { StyledButton } from "../../components/UIKit/CustomButton";
import styled from "styled-components";
import { useMessageModalState } from "../../hooks/useMessageModalState";

type Props = {
  setValue: UseFormSetValue<AlbumInput>;
  isApproved: boolean;
  currentValues?: AlbumInput;
};

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ImageUploadForm: React.FC<Props> = ({
  setValue,
  isApproved,
  currentValues,
}) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [filename, setFilename] = useState("");
  const [previewImageSrc, setPreviewImageSrc] = useState(
    currentValues?.imageFile || ""
  );

  const { mutateAsync: uploadImageMutate } = useMutation(
    ({ file, filename }: { file: File; filename: string }) =>
      uploadImage(file, filename)
  );
  const { openMessageModalWithMessage } = useMessageModalState();

  const handleChangeInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (!ev.target.files) {
        return;
      }
      const file = ev.target.files[0];
      setPreviewImageSrc(URL.createObjectURL(file));
      setFilename(file.name);
    },
    [setPreviewImageSrc]
  );

  const handleClickUpload = useCallback(async () => {
    if (!isApproved) {
      openMessageModalWithMessage("権限がありません。");
    }
    if (!inputFileRef.current?.files) {
      return;
    }

    const file = inputFileRef.current?.files[0];

    const { downLoadURL } = await uploadImageMutate({ file, filename });

    // アップロードボタンのクリックでRHF上のimageFileを変更する
    setValue("imageFile", downLoadURL);
  }, [
    filename,
    isApproved,
    openMessageModalWithMessage,
    setValue,
    uploadImageMutate,
  ]);

  return (
    <div className="album-edit-image">
      <img
        src={previewImageSrc}
        alt={"アルバムの画像"}
        onError={(e) => {
          e.currentTarget.src = NO_IMAGE;
        }}
      />
      <input
        type={"file"}
        accept="*/images"
        ref={inputFileRef}
        className="display-none"
        onChange={handleChangeInput}
      />
      <StyledButtonWrapper className="album-edit-image__select">
        <StyledButton
          disabled={!isApproved}
          onClick={() => inputFileRef.current?.click()}
        >
          画像を選択する
        </StyledButton>

        {previewImageSrc && previewImageSrc !== currentValues?.imageFile && (
          <StyledButton disabled={!isApproved} onClick={handleClickUpload}>
            アップロード
          </StyledButton>
        )}
      </StyledButtonWrapper>
    </div>
  );
};
