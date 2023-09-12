import { render, screen } from "@testing-library/react";
import { AlbumForm } from "./AlbumForm";
import { createMockAlbum } from "@ufo-society1974/factories";

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
  const testData = createMockAlbum("01");

  render(
    <AlbumForm
      role="editor"
      onSubmit={mockOnSubmit}
      currentValues={{ ...testData, imageFile: testData.image }}
    />
  );

  expect(screen.getByRole("textbox", { name: "アルバムタイトル" })).toHaveValue(
    "テストアルバムタイトル01"
  );
});
