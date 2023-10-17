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

test("新規作成の場合、入力欄は空である", () => {
  render(
    <Wrapper>
      <AlbumForm isApproved={true} onSubmit={mockOnSubmit} />
    </Wrapper>
  );
  expect(screen.getByRole("textbox", { name: "アルバムタイトル" })).toHaveValue(
    ""
  );

  // eslint-disable-next-line testing-library/prefer-presence-queries
  expect(screen.getByRole("img").getAttribute("src")).toBeFalsy();
  expect(
    screen.getByRole("textbox", { name: "公開日(YYYY-MM-DD)" })
  ).toHaveValue("");

  expect(screen.getByRole("button", { name: "保存する" })).toBeDisabled();
});

test("編集の場合、既存のアルバム情報を表示する", () => {
  const testData = createMockAlbum("01", { image: "hello.png" });

  render(
    <Wrapper>
      <AlbumForm
        isApproved={true}
        onSubmit={mockOnSubmit}
        currentValues={{ ...testData, imageFile: testData.image }}
      />
    </Wrapper>
  );
  expect(screen.getByRole("textbox", { name: "アルバムタイトル" })).toHaveValue(
    "テストアルバムタイトル01"
  );
  expect(screen.getByRole("img").getAttribute("src")).toBeTruthy();
  expect(
    screen.getByRole("textbox", { name: "公開日(YYYY-MM-DD)" })
  ).toHaveValue("1995-02-03");

  expect(screen.getByRole("button", { name: "保存する" })).toBeDisabled();
});

test("編集権限がない場合、入力欄はすべて入力不可能である", () => {
  const testData = createMockAlbum("01", { image: "hello.png" });

  render(
    <Wrapper>
      <AlbumForm
        isApproved={false}
        onSubmit={mockOnSubmit}
        currentValues={{ ...testData, imageFile: testData.image }}
      />
    </Wrapper>
  );

  expect(
    screen.getByRole("textbox", { name: "アルバムタイトル" })
  ).toHaveAttribute("readonly");
  expect(
    screen.getByRole("textbox", { name: "公開日(YYYY-MM-DD)" })
  ).toHaveAttribute("readonly");
});
test("編集権限がない場合、ボタンはすべて非活性である", () => {
  const testData = createMockAlbum("01", { image: "hello.png" });

  render(
    <Wrapper>
      <AlbumForm
        isApproved={false}
        onSubmit={mockOnSubmit}
        currentValues={{ ...testData, imageFile: testData.image }}
      />
    </Wrapper>
  );

  expect(screen.getByRole("button", { name: "画像を選択する" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "保存する" })).toBeDisabled();
});
