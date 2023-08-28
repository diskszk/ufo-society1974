import { PathParams, ResponseResolver, RestContext, RestRequest } from "msw";
import { mockAlbums as mockData } from "../../stories/mockData";
import { Album } from "@ufo-society1974/types";

const getDraftAlbums: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (req, res, ctx) => {
  const albums = mockData;

  return res(ctx.status(200), ctx.json<Album[]>(albums));
};
const getPublishedAlbums: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (req, res, ctx) => {
  const albums = mockData;

  return res(ctx.status(200), ctx.json<Album[]>(albums));
};

const getById: ResponseResolver<
  RestRequest<never, PathParams<string>>,
  RestContext
> = (req, res, ctx) => {
  const { id } = req.params;

  const album = mockData.find((album) => album.id === id);
  if (!album) {
    return res(ctx.status(404));
  }
  return res(ctx.status(200), ctx.json<Album>(album));
};

const mockAlbums = {
  getDraftAlbums,
  getPublishedAlbums,
  getById,
};

export default mockAlbums;
