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

const getById: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(200), ctx.json<Song>(testData[0]));
};

const create: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(201));
};
const update: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(204));
};
const deleteSong: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(203));
};

const mockSongs = {
  get,
  getById,
  create,
  update,
  delete: deleteSong,
};
export default mockSongs;
