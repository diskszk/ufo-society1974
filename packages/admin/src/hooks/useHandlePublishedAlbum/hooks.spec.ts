import { screen, renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { Wrapper } from "../../test-utils";
import { server } from "../../mocks/server";
import { WEB_API_BASE_URL } from "../../constants";
import { useHandlePublishedAlbum } from ".";

const setup = () => {
  const { result } = renderHook(() => useHandlePublishedAlbum(), {
    wrapper: Wrapper,
  });

  return { result };
};

test("アルバムの非公開化に成功した場合、成功した旨のモーダルを表示する", async () => {
  const { result } = setup();
  await result.current.unpublishAlbum("album-id");

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アルバムを非公開にしました。/
    );
  });
});

test("アルバムの非公開化に失敗した場合、エラーモーダルを表示する", async () => {
  server.use(
    rest.post(`${WEB_API_BASE_URL}/albums/:id/unpublish`, (_req, res, ctx) => {
      return res.once(ctx.status(404));
    })
  );
  const spy = jest.spyOn(console, "error");
  spy.mockImplementation(() => void 0);

  const { result } = setup();

  await result.current.unpublishAlbum("album-id");

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アルバムの非公開化に失敗しました。/
    );
  });

  spy.mockRestore();
});
