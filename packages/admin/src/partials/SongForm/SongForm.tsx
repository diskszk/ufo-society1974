import { useForm } from "react-hook-form";
import { SongInput, songSchema } from "../../lib/schemas/songSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textbox } from "../../components/Textbox";
import { StyledButton } from "../../components/UIKit/CustomButton";
import { BackButton } from "../../components/UIKit/BackButton";

type Props = {
  isApproved: boolean;
  currentValue?: SongInput;
};
export const SongForm: React.FC<Props> = ({ isApproved, currentValue }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SongInput>({
    resolver: zodResolver(songSchema),
    mode: "onBlur",
    defaultValues: {
      // TODO: 編集時のdefault値はurlのid(001,002)から取得する
      trackId: 0,
      title: "",
      lyric: "",
      wordsRights: "amane toda",
      musicRights: "amane toda",
    },
    values: currentValue,
  });

  return (
    <div className="inputs-container">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Textbox
          {...register("trackId", { valueAsNumber: true })}
          label={"トラックID"}
          type="number"
          required
          error={!!errors?.trackId}
          helperText={errors?.trackId?.message}
          aria-invalid={errors?.trackId ? true : false}
          variant="standard"
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
        />

        <Textbox
          {...register("wordsRights")}
          label="作詞者"
          required
          error={!!errors?.wordsRights}
          helperText={errors.wordsRights?.message}
          aria-invalid={errors?.wordsRights ? true : false}
          variant="standard"
        />

        <Textbox
          {...register("musicRights")}
          label="作曲者"
          required
          error={!!errors?.musicRights}
          helperText={errors.musicRights?.message}
          aria-invalid={errors?.musicRights ? true : false}
          variant="standard"
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
        />
        <div className="button-container-row">
          <BackButton>もどる</BackButton>
          <StyledButton
            disabled={isSubmitting || (isApproved && !isDirty)}
            type="submit"
          >
            保存する
          </StyledButton>
        </div>
      </form>
    </div>
  );
};
