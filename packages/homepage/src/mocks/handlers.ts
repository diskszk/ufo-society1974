import { rest } from "msw";
import { WEB_API_BASE_URL } from "../constants";
import { mockAlbumInfo, mockAlbums, mockSongs } from "./mockData";

export const handlers = [
  rest.get(`${WEB_API_BASE_URL}/albums`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        albums: mockAlbums,
      })
    );
  }),

  rest.get(`${WEB_API_BASE_URL}/albums/:id`, (req, res, ctx) => {
    const id = req.params.id as string;

    // 404の処理 エラー時のレスポンスが不明
    const mockAlbum = mockAlbums.find((album) => album.id === id);

    return res(
      ctx.status(200),
      ctx.json({
        albums: [mockAlbum],
        info: mockAlbumInfo,
      })
    );
  }),

  rest.get(
    `${WEB_API_BASE_URL}/albums/:albumId/songs/:songId`,
    (req, res, ctx) => {
      const songId = req.params.songId as string;

      const mockSong = mockSongs.find((song) => song.id === songId);
      return res(
        ctx.status(200),
        ctx.json({
          songs: [mockSong],
        })
      );
    }
  ),

  // access-counter
  rest.get(`${WEB_API_BASE_URL}/access/count`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ accessCount: 9999 }));
  }),

  rest.put(`${WEB_API_BASE_URL}/access/count/increment`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),
];
