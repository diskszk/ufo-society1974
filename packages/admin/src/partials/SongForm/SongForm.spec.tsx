import { render, screen } from "@testing-library/react";
import { SongForm } from "./SongForm";
import { createMockSong } from "@ufo-society1974/factories";
import { Wrapper } from "../../test-utils";

const mockOnSubmit = jest.fn();

test("新規作成の場合、トラックナンバーは1かつ、タイトル・歌詞の入力欄は空である", () => {
  render(
    <Wrapper>
      <SongForm isApproved={true} onSubmit={mockOnSubmit} />
    </Wrapper>
  );
  expect(screen.getByRole("spinbutton", { name: "トラックID" })).toHaveValue(1);
  expect(screen.getByRole("textbox", { name: "タイトル" })).toHaveValue("");
  expect(screen.getByRole("textbox", { name: "歌詞" })).toHaveValue("");

  expect(screen.getByRole("button", { name: "保存する" })).toBeDisabled();
});

test("編集の場合、既存のアルバム情報を表示する", () => {
  const testData = createMockSong("01");

  render(
    <Wrapper>
      <SongForm
        isApproved={true}
        onSubmit={mockOnSubmit}
        currentValues={{ ...testData, trackId: 10 }}
      />
    </Wrapper>
  );
  expect(screen.getByRole("spinbutton", { name: "トラックID" })).toHaveValue(
    10
  );
  expect(screen.getByRole("textbox", { name: "タイトル" })).toHaveValue(
    "ソングタイトル01"
  );

  expect(screen.getByRole("button", { name: "保存する" })).toBeDisabled();
});

test("編集権限がない場合、入力欄はすべて入力不可能である", () => {
  const testData = createMockSong("01");

  render(
    <Wrapper>
      <SongForm
        isApproved={false}
        onSubmit={mockOnSubmit}
        currentValues={{ ...testData, trackId: 1 }}
      />
    </Wrapper>
  );

  expect(
    screen.getByRole("spinbutton", { name: "トラックID" })
  ).toHaveAttribute("readonly");
  expect(screen.getByRole("textbox", { name: "タイトル" })).toHaveAttribute(
    "readonly"
  );
});
test("編集権限がない場合、ボタンはすべて非活性である", () => {
  const testData = createMockSong("01");

  render(
    <Wrapper>
      <SongForm
        isApproved={false}
        onSubmit={mockOnSubmit}
        currentValues={{ ...testData, trackId: 1 }}
      />
    </Wrapper>
  );

  expect(screen.getByRole("button", { name: "保存する" })).toBeDisabled();
});
