import { renderHook, waitFor } from "@testing-library/react";
import { useFetchAlbum } from ".";
import { WrapperWithFetch as Wrapper } from "../../../test-utils";
import { ReactNode } from "react";
import * as draftAlbumsModule from "../../../lib/draftAlbums";
import * as publishedAlbumsModule from "../../../lib/publishedAlbums";

const albumId = "album-01";

const spiedDraftAlbum = jest.spyOn(draftAlbumsModule, "fetchDraftAlbumById");

const spiedPublishedAlbum = jest.spyOn(
  publishedAlbumsModule,
  "fetchPublishedAlbumById"
);

afterEach(() => {
  spiedDraftAlbum.mockClear();
  spiedPublishedAlbum.mockClear();
});

test("URLが`/albums/edit/`を含む場合、未公開のアルバムを取得する関数を呼び出す", async () => {
  const { result } = renderHook(() => useFetchAlbum(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Wrapper
        memoryRouterOptions={{ initialEntries: [`/albums/edit/${albumId}`] }}
      >
        {children}
      </Wrapper>
    ),
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBeTruthy();
  });

  expect(spiedDraftAlbum).toBeCalledTimes(1);
});

test("URLが`/albums/preview/`を含む場合、公開済みアルバムを取得する関数を呼び出す", async () => {
  const { result } = renderHook(() => useFetchAlbum(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <Wrapper
        memoryRouterOptions={{ initialEntries: [`/albums/preview/${albumId}`] }}
      >
        {children}
      </Wrapper>
    ),
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBeTruthy();
  });

  expect(spiedPublishedAlbum).toBeCalledTimes(1);
});
