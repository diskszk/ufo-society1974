import { PathParams, ResponseResolver, RestContext, RestRequest } from "msw";
import { Album, UpdateAlbumDTO } from "@ufo-society1974/types";
import { createMockAlbum } from "@ufo-society1974/factories";
import { NO_IMAGE, THREE_SONGS } from "../../constants";

const mockData = {
  albums: [
    createMockAlbum("draft-01", { image: THREE_SONGS }),
    createMockAlbum("draft-02", { image: NO_IMAGE }),
    createMockAlbum("draft-03", { image: NO_IMAGE }),
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

const update: ResponseResolver<
  RestRequest<UpdateAlbumDTO, PathParams<string>>,
  RestContext
> = (_req, res, ctx) => {
  return res(ctx.status(204));
};

const mockDraftAlbums = {
  get,
  getById,
  update,
};

export default mockDraftAlbums;
