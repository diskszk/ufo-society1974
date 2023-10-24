import { screen, renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { Wrapper } from "../../test-utils";
import { createMockAlbum } from "@ufo-society1974/factories";
import { UpdateAlbumDTO } from "@ufo-society1974/types";
import { server } from "../../mocks/server";
import { WEB_API_BASE_URL } from "../../constants";
import { AlbumInput } from "../../schemas/albumSchema";
import { useHandleDraftAlbum } from ".";

const setup = () => {
  const { result } = renderHook(() => useHandleDraftAlbum(), {
    wrapper: Wrapper,
  });

  return { result };
};

const album = createMockAlbum("01");
const newAlbum: AlbumInput = { ...album, imageFile: album.image };
const updateAlbumDto: UpdateAlbumDTO = {
  ...album,
  image: album.image,
  id: album.id,
};

type RESTMethods = "get" | "post" | "put" | "delete";
const failRequest = ({ method, url }: { method: RESTMethods; url: string }) => {
  server.use(
    rest[method](url, (_req, res, ctx) => {
      return res.once(
        ctx.status(500),
        ctx.json({ message: "InternalServer Error." })
      );
    })
  );
};

test("アルバムの新規作成に成功した場合、成功した旨のメッセージをモーダル表示する", async () => {
  const { result } = setup();

  await result.current.createAlbum(newAlbum);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アルバムを作成しました。/
    );
  });
});

test("アルバムの新規作成に失敗した場合、エラーモーダルを表示する", async () => {
  failRequest({ method: "post", url: `${WEB_API_BASE_URL}/draft-albums` });

  const spy = jest.spyOn(console, "error");
  spy.mockImplementation(() => void 0);

  const { result } = setup();
  await result.current.createAlbum(newAlbum);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アルバムの作成に失敗しました。/
    );
  });
  spy.mockRestore();
});

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
  failRequest({ method: "put", url: `${WEB_API_BASE_URL}/draft-albums/:id` });

  const spy = jest.spyOn(console, "error");
  spy.mockImplementation(() => void 0);

  const { result } = setup();
  await result.current.updateAlbum(updateAlbumDto);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アルバムの更新に失敗しました。/
    );
  });
  spy.mockRestore();
});
