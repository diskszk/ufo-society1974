import { PathParams, ResponseResolver, RestContext, RestRequest } from "msw";
import { Album } from "@ufo-society1974/types";
import { createMockAlbum } from "@ufo-society1974/factories";
import { NO_IMAGE, THREE_SONGS } from "../../constants";

const mockData = {
  albums: [
    createMockAlbum("published-01", { image: THREE_SONGS }),
    createMockAlbum("published-02", { image: NO_IMAGE }),
  ],
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
  return res(ctx.status(200), ctx.json<Album>(mockData.albums[0]));
};

const unpublishAlbum: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(201));
};

const mockPublishedAlbums = {
  get,
  getById,
  unpublishAlbum,
};

export default mockPublishedAlbums;
