import { cleanup, renderHook, screen, waitFor } from "@testing-library/react";
import { useImageUpload } from "./hooks";
import { Wrapper } from "../../test-utils";

jest.mock("../../lib/storages", () => ({
  uploadImage: (_file: never, _filename: never) => {
    throw new Error("Internal Server Error.");
  },
}));

const mockFn = jest.fn();
const mockFile = new File(["hello"], "hello.png", { type: "image/png" });

afterEach(() => {
  mockFn.mockClear();
  cleanup();
});

const setup = () => {
  const { result } = renderHook(() => useImageUpload(), { wrapper: Wrapper });

  return { result };
};

test("認可されていないユーザーが実行した場合、エラーモーダルを表示する", async () => {
  const { result } = setup();

  await result.current.upload(mockFile, mockFn, false);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "画像をアップロードする権限がありません。"
    );
  });
});

test("アップロード時にサーバーエラーが発生した場合、エラーメッセージを表示する", async () => {
  const { result } = setup();

  await result.current.upload(mockFile, mockFn, true);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "サーバーでエラーが発生しました。"
    );
  });
});
