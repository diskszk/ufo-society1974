import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlbumInput, albumSchema } from "../../lib/schemas/albumSchema";
import { Textbox } from "../../components/Textbox";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { NO_IMAGE, ROLE } from "../../constants";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../lib/storages";

type Props = {
  onSubmit: SubmitHandler<AlbumInput>;
  role: string;
  currentValues?: AlbumInput;
};

export const AlbumForm: React.FC<Props> = ({
  onSubmit,
  role,
  currentValues,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful, isSubmitting },
    setValue,
  } = useForm<AlbumInput>({
    resolver: zodResolver(albumSchema),
    mode: "onBlur",
    defaultValues: {
      imageFile: "",
      title: "",
      publishedDate: "",
    },
    values: currentValues,
  });

  const { mutateAsync: uploadImageMutate } = useMutation(
    ({ file, filename }: { file: File; filename: string }) =>
      uploadImage(file, filename)
  );
  const [filename, setFilename] = useState("");
  const [previewImageSrc, setPreviewImageSrc] = useState(
    currentValues?.imageFile || ""
  );
  const inputFileRef = useRef<HTMLInputElement | null>(null);

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
    if (!inputFileRef.current?.files) {
      return;
    }

    const file = inputFileRef.current?.files[0];

    const { downLoadURL } = await uploadImageMutate({ file, filename });

    // アップロードボタンのクリックでRHF上のimageFileを変更する
    setValue("imageFile", downLoadURL);
  }, [filename, setValue, uploadImageMutate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setValue("imageFile", "");
    }
  }, [isSubmitSuccessful, reset, setValue]);

  const isApprovedUser = role === ROLE.EDITOR;

  return (
    <div className="inputs-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textbox
          {...register("title")}
          label={"アルバムタイトル"}
          type="text"
          required
          error={!!errors?.title}
          helperText={errors?.title?.message}
          aria-invalid={errors?.title ? true : false}
          variant="standard"
        />

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
          <button onClick={() => inputFileRef.current?.click()}>
            画像を選択する
          </button>
          {previewImageSrc && previewImageSrc !== currentValues?.imageFile && (
            <button onClick={handleClickUpload}>画像をアップロードする</button>
          )}
        </div>
        <div className="spacing-div" />

        <Textbox
          {...register("publishedDate")}
          label="公開日(YYYY-MM-DD)"
          type="text"
          required
          error={!!errors?.publishedDate}
          helperText={errors?.publishedDate?.message}
          aria-invalid={errors?.publishedDate ? true : false}
          variant="standard"
        />

        <div className="button-container-row">
          {/* href要素を含めることでaタグとみなされる!! */}
          <StyledButton href="/albums">もどる</StyledButton>

          <StyledButton
            disabled={isSubmitting || (isApprovedUser && !isDirty)}
            type="submit"
          >
            保存する
          </StyledButton>
        </div>
      </form>
    </div>
  );
};
