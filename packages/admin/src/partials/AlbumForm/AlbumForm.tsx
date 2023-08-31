import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlbumInput, albumSchema } from "../../lib/schemas/albumSchema";
import { Textbox } from "../../components/Textbox";
import { ImageUploadForm } from "../ImageUploadForm";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { getDefaultImageFile } from "../../lib/helpers/getDefaultImageFile";
import { NO_IMAGE, ROLE } from "../../constants";
import { Album } from "@ufo-society1974/types";
import { useImageFile } from "./hooks";

type Props = {
  onSubmit: SubmitHandler<AlbumInput>;
  role: string;
  album?: Album;
};

export const AlbumForm: React.FC<Props> = ({ onSubmit, role, album }) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful, isSubmitting },
  } = useForm<AlbumInput>({
    resolver: zodResolver(albumSchema),
    mode: "onBlur",
    defaultValues: {
      imageFile: getDefaultImageFile(),
      title: album?.title || "",
      publishedDate: album?.publishedDate || "",
    },
  });

  const { previewImageSrc } = useImageFile(watch, album?.image);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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
          <ImageUploadForm {...register("imageFile")} />

          <img
            src={previewImageSrc}
            alt={"アルバムのイメージ"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = NO_IMAGE;
            }}
          />
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
