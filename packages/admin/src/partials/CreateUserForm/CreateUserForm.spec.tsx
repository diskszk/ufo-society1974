import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { composeStories } from "@storybook/react";
import * as stories from "./CreateUserForm.stories";
import { CreateUserForm } from "./CreateUserForm";
import { CreateUserInputs } from "../../schemas/createUserSchema";
import { setupCreateUser } from "../../test-utils/createUser";

const user = userEvent.setup();

const mockOnSubmit = jest.fn();

const mockHistoryBack = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    goBack: mockHistoryBack,
  }),
}));

afterEach(() => {
  mockOnSubmit.mockClear();
  cleanup();
});

const setup = async (injectValues?: Partial<CreateUserInputs>) => {
  render(<CreateUserForm onSubmit={mockOnSubmit} role="master" />);
  return await setupCreateUser(injectValues);
};

test("何も入力されていない場合、ボタンは非活性である", async () => {
  render(<CreateUserForm onSubmit={mockOnSubmit} role="master" />);

  expect(screen.getByRole("button", { name: "登録する" })).toBeDisabled();
});

test("名前が未入力である場合、エラーメッセージを表示する", async () => {
  const { EmptyUsername } = composeStories(stories);

  const { container } = render(<EmptyUsername />);

  await act(async () => {
    await EmptyUsername.play({ canvasElement: container });
  });

  await waitFor(() => {
    expect(
      screen.getByText(/名前は必ず入力してください。/)
    ).toBeInTheDocument();
  });
  expect(screen.getByRole("textbox", { name: "お名前" })).toBeInvalid();
});

test("メールアドレスが未入力である場合、エラーメッセージを表示する", async () => {
  const { EmptyEmail } = composeStories(stories);

  const { container } = render(<EmptyEmail />);

  await act(async () => {
    await EmptyEmail.play({ canvasElement: container });
  });

  await waitFor(() => {
    expect(
      screen.getByText(/メールアドレスは必ず入力してください。/)
    ).toBeInTheDocument();
  });
  expect(screen.getByRole("textbox", { name: "E-mail" })).toBeInvalid();
});

test("メールアドレス入力欄にメールアドレス以外の値が入力された場合、エラーメッセージを表示する", async () => {
  const { form } = await setup({ email: "1234" });

  expect(
    await screen.findByText(/不正なメールアドレス形式です。/)
  ).toBeInTheDocument();
  expect(form.email).toBeInvalid();
});

test("パスワードが未入力である場合、エラーメッセージを表示する", async () => {
  const { EmptyPassword } = composeStories(stories);

  const { container } = render(<EmptyPassword />);

  await act(async () => {
    await EmptyPassword.play({ canvasElement: container });
  });

  await waitFor(() => {
    expect(
      screen.getByText(/パスワードは8文字以上で入力してください。/)
    ).toBeInTheDocument();
  });
  expect(screen.getByPlaceholderText("8文字以上で入力")).toBeInvalid();
});

test("パスワード入力欄に全角文字が入力された場合、エラーメッセージを表示する", async () => {
  const { form } = await setup({ password: "asdf1234あいうえ" });

  expect(
    await screen.findByText(/パスワードは半角英数字混合で入力してください。/)
  );
  expect(form.password).toBeInvalid();
});

test("パスワード入力欄に7文字しか入力されなかった場合、エラーメッセージを表示する", async () => {
  const { form } = await setup({ password: "asdf123" });

  expect(await screen.findByText(/パスワードは8文字以上で入力してください。/));
  expect(form.password).toBeInvalid();
});

test("パスワード入力欄に65文字入力された場合、エラーメッセージを表示する", async () => {
  const s = "abcde".repeat(12) + "12345";
  const { form } = await setup({ password: s });

  expect(await screen.findByText(/パスワードは64文字以下で入力してください。/));
  expect(form.password).toBeInvalid();
});

test("パスワード(確認)が未入力である場合、エラーメッセージを表示する", async () => {
  const { EmptyConfirmPassword } = composeStories(stories);

  const { container } = render(<EmptyConfirmPassword />);

  await act(async () => {
    await EmptyConfirmPassword.play({ canvasElement: container });
  });

  await waitFor(() => {
    expect(
      screen.getByText(/パスワードは8文字以上で入力してください。/)
    ).toBeInTheDocument();
  });
  expect(screen.getByPlaceholderText("8文字以上で入力(確認)")).toBeInvalid();
});
test("パスワードとパスワード(確認)が一致しない場合、エラーメッセージを表示する", async () => {
  const { InvalidConfirmPassword } = composeStories(stories);
  const { container } = render(<InvalidConfirmPassword />);

  await InvalidConfirmPassword.play({ canvasElement: container });

  await waitFor(() => {
    expect(screen.getByText(/パスワードが一致しません。/)).toBeInTheDocument();
  });
  expect(screen.getByPlaceholderText("8文字以上で入力(確認)")).toBeInvalid();
});

test("すべての入力欄が正常な値で入力された場合、登録するボタンは活性である", async () => {
  const { Valid } = composeStories(stories);

  const { container } = render(<Valid />);

  await act(async () => {
    await Valid.play({
      canvasElement: container,
    });
  });

  await waitFor(() => {
    expect(screen.getByRole("button", { name: "登録する" })).toBeEnabled();
  });
});

test.skip("submit処理中は、submitボタンは非活性である", async () => {
  const { form } = await setup();

  await user.click(form.submitButton);

  expect(form.submitButton).toBeDisabled();
});

test("ボタンをクリックした後、入力欄はすべて空になる", async () => {
  const { Valid } = composeStories(stories);
  const { container } = render(<Valid />);
  await act(async () => {
    await Valid.play({
      canvasElement: container,
      args: {
        onSubmit: mockOnSubmit,
      },
    });
  });

  await user.click(screen.getByRole("button", { name: "登録する" }));

  await waitFor(() => {
    expect(screen.getByRole("textbox", { name: "お名前" })).toHaveValue("");
  });
  expect(screen.getByRole("textbox", { name: "E-mail" })).toHaveValue("");
  expect(screen.getByPlaceholderText("8文字以上で入力")).toHaveValue("");
  expect(screen.getByPlaceholderText("8文字以上で入力(確認)")).toHaveValue("");
});
