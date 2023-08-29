import { PathParams, ResponseResolver, RestContext, RestRequest } from "msw";
import { Album } from "@ufo-society1974/types";
import { createMockAlbum } from "@ufo-society1974/factories";

const mockData = {
  albums: [createMockAlbum("published-01"), createMockAlbum("published-02")],
  album: createMockAlbum("published-03"),
};

const get: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json<Album[]>(mockData.albums));
};

const mockPublishedAlbums = {
  get,
};

export default mockPublishedAlbums;
