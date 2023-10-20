import z from "zod";

export const songSchema = z.object({
  trackId: z
    .number()
    .gte(1, { message: "1以上の整数で入力してください。" })
    .int({ message: "1以上の整数で入力してください。" }),
  title: z
    .string()
    .min(1, { message: "楽曲タイトルは必ず入力してください。" })
    .max(255, {
      message: `
    楽曲タイトルが長すぎて入力を受け入れられません。
    楽曲タイトルは225文字以内で入力してください。
    `,
    }),
  wordsRights: z.string().max(64, {
    message: "作詞者名は64文字以内で入力してください。",
  }),
  musicRights: z.string().max(64, {
    message: "作曲者名は64文字以内で入力してください。",
  }),
  lyric: z.string().min(0).max(10000, {
    message: "10000文字以上入力できません。",
  }),
});

export type SongInput = z.infer<typeof songSchema>;
