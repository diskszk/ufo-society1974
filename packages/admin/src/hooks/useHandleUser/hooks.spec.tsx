import { renderHook, waitFor, screen } from "@testing-library/react";
import { Wrapper } from "../../test-utils";
import { useHandleUser } from ".";
import { input } from "../../test-utils/createUser";

jest.mock("../../lib/auth", () => ({
  createUserInFirebase: (_email: string, _password: string) => {
    return {
      uid: "newusergenerateduid",
    };
  },
}));

test("ユーザーロールがmasterの場合、登録ボタンをクリックするとユーザー作成に成功した旨のメッセージを表示する", async () => {
  const { result } = renderHook(() => useHandleUser(), {
    wrapper: Wrapper,
  });

  await result.current.handleCreate(input);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アリスを作成しました。/
    );
  });
});
