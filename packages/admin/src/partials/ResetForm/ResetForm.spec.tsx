import { act, render, screen, waitFor } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import * as stories from "./ResetForm.stories";
import { ResetForm } from "./ResetForm";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
const mockFn = jest.fn();

test("何も入力されていない場合、ボタンは非活性である", async () => {
  render(<ResetForm onSubmit={mockFn} />);

  expect(screen.getByRole("button", { name: "リセット" })).toBeDisabled();
});

test("メールアドレス以外の文字列が入力された場合、エラーメッセージを表示する", async () => {
  const { InvalidEmail } = composeStories(stories);

  const { container } = render(<InvalidEmail />);

  await InvalidEmail.play({ canvasElement: container });

  await waitFor(() => {
    expect(
      screen.getByText(/不正なメールアドレス形式です。/)
    ).toBeInTheDocument();
  });
  expect(screen.getByRole("textbox", { name: "E-mail" })).toBeInvalid();
});

test("正しくメールアドレスが入力された場合、リセットボタンは活性である", async () => {
  const { ValidEmail } = composeStories(stories);

  const { container } = render(<ValidEmail />);

  await act(async () => {
    await ValidEmail.play({
      canvasElement: container,
    });
  });

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "リセット" })).toBeEnabled();
  });
});

test("正しくメールアドレスが入力されリセットボタンをクリックされた場合、メールアドレス入力欄は空になる", async () => {
  const { ValidEmail } = composeStories(stories);

  const { container } = render(<ValidEmail />);

  await act(async () => {
    await ValidEmail.play({
      canvasElement: container,
      args: { onSubmit: mockFn },
    });
  });

  await user.click(screen.getByRole("button", { name: "リセット" }));

  await waitFor(() => {
    expect(screen.getByRole("textbox", { name: "E-mail" })).toHaveValue("");
  });
});
