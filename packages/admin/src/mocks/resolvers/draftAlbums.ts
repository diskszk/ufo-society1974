import { PathParams, ResponseResolver, RestContext, RestRequest } from "msw";
import { Album } from "@ufo-society1974/types";
import { createMockAlbum } from "@ufo-society1974/factories";

const mockData = {
  albums: [
    createMockAlbum("draft-01"),
    createMockAlbum("draft-02"),
    createMockAlbum("draft-03"),
  ],
  album: createMockAlbum("draft-04"),
};

const get: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(200), ctx.json<Album[]>(mockData.albums));
};

const getById: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(200), ctx.json<Album>(mockData.album));
};

const mockDraftAlbums = {
  get,
  getById,
};

export default mockDraftAlbums;
