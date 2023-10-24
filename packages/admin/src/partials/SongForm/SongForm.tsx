import { SubmitHandler, useForm } from "react-hook-form";
import { SongInput, songSchema } from "../../schemas/songSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textbox } from "../../components/Textbox";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { BackButton } from "../../components/UIKit/BackButton";

type Props = {
  onSubmit: SubmitHandler<SongInput>;
  isApproved: boolean;
  currentValues?: SongInput;
};
export const SongForm: React.FC<Props> = ({
  onSubmit,
  isApproved,
  currentValues: currentValue,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isSubmitSuccessful, isSubmitting },
  } = useForm<SongInput>({
    resolver: zodResolver(songSchema),
    mode: "onBlur",
    defaultValues: {
      // TODO: 編集時のdefault値はurlのid(001,002)から取得する
      trackId: 1,
      title: "",
      lyric: "",
      wordsRights: "amane toda",
      musicRights: "amane toda",
    },
    values: currentValue,
  });

  if (isSubmitSuccessful) {
    reset();
  }

  return (
    <div className="inputs-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textbox
          {...register("trackId", { valueAsNumber: true })}
          label={"トラックID"}
          type="number"
          required
          error={!!errors?.trackId}
          helperText={errors?.trackId?.message}
          aria-invalid={errors?.trackId ? true : false}
          variant="standard"
          inputProps={{ readOnly: !isApproved }}
        />
        <p className="inputs-container-description">
          デフォルトのIDで一番下に表示されます。
        </p>

        <Textbox
          {...register("title")}
          label="タイトル"
          required
          error={!!errors?.title}
          helperText={errors.title?.message}
          aria-invalid={errors?.title ? true : false}
          variant="standard"
          inputProps={{ readOnly: !isApproved }}
        />

        <Textbox
          {...register("wordsRights")}
          label="作詞者"
          required
          error={!!errors?.wordsRights}
          helperText={errors.wordsRights?.message}
          aria-invalid={errors?.wordsRights ? true : false}
          variant="standard"
          inputProps={{ readOnly: !isApproved }}
        />

        <Textbox
          {...register("musicRights")}
          label="作曲者"
          required
          error={!!errors?.musicRights}
          helperText={errors.musicRights?.message}
          aria-invalid={errors?.musicRights ? true : false}
          variant="standard"
          inputProps={{ readOnly: !isApproved }}
        />

        <Textbox
          {...register("lyric")}
          label="歌詞"
          multiline
          rows={16}
          required
          error={!!errors?.lyric}
          helperText={errors.lyric?.message}
          aria-invalid={errors?.lyric ? true : false}
          variant="standard"
          inputProps={{ readOnly: !isApproved }}
        />
        <div className="button-container-row">
          <BackButton>もどる</BackButton>
          <StyledButton
            disabled={isSubmitting || isApproved || !isDirty}
            type="submit"
          >
            保存する
          </StyledButton>
        </div>
      </form>
    </div>
  );
};
