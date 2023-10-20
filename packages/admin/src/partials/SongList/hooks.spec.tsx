import { renderHook, screen, waitFor } from "@testing-library/react";
import { useHandleSong } from "./hooks";
import { WrapperWithFetch as Wrapper } from "../../test-utils";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { WEB_API_BASE_URL } from "../../constants";

test("正常終了時にモーダル表示する", async () => {
  const { result } = renderHook(() => useHandleSong(), {
    wrapper: Wrapper,
  });

  await result.current.handleDeleteSong(
    "album-id-01",
    "song-id-01",
    "song-title-01"
  );

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /song-title-01を削除しました。/
    );
  });
});

test("異常終了時にエラーモーダルを表示する", async () => {
  server.use(
    rest.delete(
      `${WEB_API_BASE_URL}/albums/:albumId/songs/:songId`,
      (_req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ message: "InternalServer Error." })
        );
      }
    )
  );

  const { result } = renderHook(() => useHandleSong(), {
    wrapper: Wrapper,
  });

  await result.current.handleDeleteSong(
    "album-id-01",
    "song-id-01",
    "song-title-01"
  );

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /song-title-01の削除に失敗しました。/
    );
  });
});
