import { render, screen } from "@testing-library/react";
import { AlbumForm } from "./AlbumForm";
import { Wrapper } from "../../test-utils";

const mockOnSubmit = jest.fn();

jest.mock("../../lib/storages.ts", () => ({
  uploadImage: (_file: never, _filename: never) => {
    return { downloadURL: "" };
  },
}));

const setup = () => {
  render(
    <Wrapper>
      <AlbumForm isApproved={true} onSubmit={mockOnSubmit} />
    </Wrapper>
  );
};

test("新規作成の場合、入力欄は空である", () => {
  setup();

  expect(screen.getByRole("textbox", { name: "アルバムタイトル" })).toHaveValue(
    ""
  );
});
