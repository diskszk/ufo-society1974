import { screen, renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { Wrapper } from "../../test-utils";
import { createMockSong } from "@ufo-society1974/factories";
import { UpdateSongDTO } from "@ufo-society1974/types";
import { server } from "../../mocks/server";
import { WEB_API_BASE_URL } from "../../constants";
import { useHandleSong } from ".";
import { SongInput } from "../../schemas/songSchema";

const setup = () => {
  const { result } = renderHook(() => useHandleSong(), {
    wrapper: Wrapper,
  });

  return { result };
};

const albumId = "album-id";
const song = createMockSong("01");
const newSong: SongInput = { ...song, trackId: 10 };
const updateSongDto: UpdateSongDTO = {
  ...song,
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

test("楽曲の新規作成に成功した場合、成功した旨のメッセージをモーダル表示する", async () => {
  const { result } = setup();

  await result.current.handleCrateSong(albumId, newSong);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /楽曲を作成しました。/
    );
  });
});

test("楽曲の新規作成に失敗した場合、エラーモーダルを表示する", async () => {
  failRequest({
    method: "post",
    url: `${WEB_API_BASE_URL}/albums/:id/songs`,
  });

  const spy = jest.spyOn(console, "error");
  spy.mockImplementation(() => void 0);

  const { result } = setup();
  await result.current.handleCrateSong(albumId, newSong);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /楽曲の作成に失敗しました。/
    );
  });
  spy.mockRestore();
});

test("楽曲の更新に成功した場合、成功した旨のモーダルを表示する", async () => {
  const { result } = setup();

  await result.current.handleUpdateSong(albumId, "01", updateSongDto);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /楽曲を更新しました。/
    );
  });
});

test("楽曲の更新に失敗した場合、エラーモーダルを表示する", async () => {
  failRequest({
    method: "put",
    url: `${WEB_API_BASE_URL}/albums/:id/songs/:songId`,
  });

  const spy = jest.spyOn(console, "error");
  spy.mockImplementation(() => void 0);

  const { result } = setup();
  await result.current.handleUpdateSong(albumId, "01", updateSongDto);

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /楽曲の更新に失敗しました。/
    );
  });
  spy.mockRestore();
});

test("楽曲の削除に成功した場合、成功した旨のメッセージをモーダル表示する", async () => {
  const { result } = setup();

  await result.current.handleDeleteSong(albumId, "01");

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /楽曲を削除しました。/
    );
  });
});
test("楽曲の削除に失敗した場合、エラーモーダルを表示する", async () => {
  failRequest({
    method: "delete",
    url: `${WEB_API_BASE_URL}/albums/:id/songs/:songId`,
  });

  const spy = jest.spyOn(console, "error");
  spy.mockImplementation(() => void 0);

  const { result } = setup();
  await result.current.handleDeleteSong(albumId, "01");

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /楽曲の削除に失敗しました。/
    );
  });
  spy.mockRestore();
});
