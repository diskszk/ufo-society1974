import { useCallback, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { AlbumInput } from "../../schemas/albumSchema";
import { NO_IMAGE } from "../../constants";
import { StyledButton } from "../../components/UIKit/CustomButton";
import styled from "styled-components";
import { useImageUpload } from "./hooks";

type Props = {
  setValue: UseFormSetValue<AlbumInput>;
  isApproved: boolean;
  currentValues?: AlbumInput;
};

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;

  > button {
    height: 2.5em;
    width: 10em;
  }
`;

export const ImageUploadForm: React.FC<Props> = ({
  setValue,
  isApproved,
  currentValues,
}) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const { upload } = useImageUpload();

  const [previewImageSrc, setPreviewImageSrc] = useState(
    currentValues?.imageFile || ""
  );

  const handleChangeInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (!ev.target.files) {
        return;
      }
      const file = ev.target.files[0];
      setPreviewImageSrc(URL.createObjectURL(file));
    },
    []
  );

  const handleClickUpload = useCallback(async () => {
    if (!inputFileRef.current?.files) {
      return;
    }
    const file = inputFileRef.current?.files[0];

    await upload(file, setValue, isApproved);
  }, [isApproved, setValue, upload]);

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
        type="file"
        accept="image/*"
        ref={inputFileRef}
        className="display-none"
        onChange={handleChangeInput}
        aria-label="file-uploader"
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
