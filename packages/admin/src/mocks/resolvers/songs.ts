import { createMockSong } from "@ufo-society1974/factories";
import { Song } from "@ufo-society1974/types";
import { PathParams, ResponseResolver, RestContext, RestRequest } from "msw";

const testData = [
  createMockSong("01"),
  createMockSong("02"),
  createMockSong("03"),
  createMockSong("04"),
];

const get: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(200), ctx.json<Song[]>(testData));
};

const mockSongs = {
  get,
};
export default mockSongs;
