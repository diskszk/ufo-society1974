import { render, screen } from "@testing-library/react";
import { AlbumForm } from "./AlbumForm";
import { mockAlbums } from "../../stories/mockData";

const mockOnSubmit = jest.fn();

jest.mock("./hooks", () => ({
  useImageFile: (_watch: never) => {
    return { previewImageSrc: "" };
  },
}));
jest.mock("../../lib/helpers/getDefaultImageFile", () => ({
  getDefaultImageFile: () => {
    return;
  },
}));

test("新規作成の場合、入力欄は空である", () => {
  render(<AlbumForm role="editor" onSubmit={mockOnSubmit} />);

  expect(screen.getByRole("textbox", { name: "アルバムタイトル" })).toHaveValue(
    ""
  );
});
test("編集の場合、既存のアルバム情報を表示する", () => {
  render(
    <AlbumForm role="editor" onSubmit={mockOnSubmit} album={mockAlbums[0]} />
  );

  expect(screen.getByRole("textbox", { name: "アルバムタイトル" })).toHaveValue(
    "テストアルバムタイトル01"
  );
});
