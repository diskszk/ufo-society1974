import { screen, renderHook, waitFor } from "@testing-library/react";
import { useHandleDraftAlbum } from ".";
import { Wrapper } from "../../test-utils";
import { createMockAlbum } from "@ufo-society1974/factories";
import { UpdateAlbumDTO } from "@ufo-society1974/types";
import { server } from "../../mocks/server";
import { rest } from "msw";
import { WEB_API_BASE_URL } from "../../constants";

const setup = () => {
  const { result } = renderHook(() => useHandleDraftAlbum(), {
    wrapper: Wrapper,
  });

  return { result };
};

const album = createMockAlbum("01");
const updateAlbumDto: UpdateAlbumDTO = {
  ...album,
  image: album.image,
  id: album.id,
};

test("アルバムの更新に成功した場合、成功した旨のモーダルを表示する", async () => {
  const { result } = setup();

  await result.current.updateAlbum(updateAlbumDto);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アルバムを更新しました。/
    );
  });
});

test("アルバムの更新に失敗した場合、エラーモーダルを表示する", async () => {
  server.use(
    rest.put(`${WEB_API_BASE_URL}/draft-albums/:id`, (_req, res, ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({ message: "InternalServer Error." })
      );
    })
  );

  const { result } = setup();
  await result.current.updateAlbum(updateAlbumDto);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アルバムの更新に失敗しました。/
    );
  });
});

test.skip("アルバムの非公開化に成功した場合、成功した旨のモーダルを表示する", async () => {
  const { result } = setup();
  await result.current.unpublishAlbum(album.id);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アルバムを非公開にしました。/
    );
  });
});

test.skip("アルバムの非公開化に失敗した場合、エラーモーダルを表示する", async () => {
  server.use(
    rest.post(
      `${WEB_API_BASE_URL}/albums/:albumId/unpublish`,
      (_req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ message: "InternalServer Error." })
        );
      }
    )
  );

  const { result } = setup();

  await result.current.unpublishAlbum(album.id);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /サーバーでエラーが発生しました。/
    );
  });
});
