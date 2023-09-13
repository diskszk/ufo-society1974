import { render, screen } from "@testing-library/react";
import { AlbumForm } from "./AlbumForm";
import { createMockAlbum } from "@ufo-society1974/factories";
import { Wrapper } from "../../test-utils";

const mockOnSubmit = jest.fn();

jest.mock("../../lib/storages.ts", () => ({
  uploadImage: (_file: never, _filename: never) => {
    return { downloadURL: "" };
  },
}));

const setup = () => {
  const testData = createMockAlbum("01");

  render(
    <Wrapper>
      <AlbumForm
        isApproved={true}
        onSubmit={mockOnSubmit}
        currentValues={{ ...testData, imageFile: testData.image }}
      />
    </Wrapper>
  );
};

test("編集の場合、既存のアルバム情報を表示する", () => {
  setup();

  expect(screen.getByRole("textbox", { name: "アルバムタイトル" })).toHaveValue(
    "テストアルバムタイトル01"
  );
});
