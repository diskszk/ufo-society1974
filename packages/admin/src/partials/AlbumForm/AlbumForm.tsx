import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlbumInput, albumSchema } from "../../lib/schemas/albumSchema";
import { Textbox } from "../../components/Textbox";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { ImageUploadForm } from "../ImageUploadForm";

type Props = {
  onSubmit: SubmitHandler<AlbumInput>;
  isApproved: boolean;
  currentValues?: AlbumInput;
};

export const AlbumForm: React.FC<Props> = ({
  onSubmit,
  isApproved,
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setValue("imageFile", "");
    }
  }, [isSubmitSuccessful, reset, setValue]);

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
          inputProps={{ readOnly: !isApproved }}
        />

        <ImageUploadForm
          setValue={setValue}
          isApproved={isApproved}
          currentValues={currentValues}
        />

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
          inputProps={{ readOnly: !isApproved }}
        />

        <div className="button-container-row">
          {/* href要素を含めることでaタグとみなされる!! */}
          <StyledButton href="/albums">もどる</StyledButton>

          <StyledButton
            disabled={isSubmitting || !isApproved || !isDirty}
            type="submit"
          >
            保存する
          </StyledButton>
        </div>
      </form>
    </div>
  );
};
