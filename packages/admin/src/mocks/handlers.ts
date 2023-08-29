import { rest } from "msw";
import mockUsers from "./resolvers/users";
import { WEB_API_BASE_URL } from "../constants";
import mockDraftAlbums from "./resolvers/draftAlbums";
import mockPublishedAlbums from "./resolvers/publishedAlbums";

const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};

export const handlers = [
  rest.get(baseUrl("/users"), mockUsers.get),
  rest.get(baseUrl("/users/:id"), mockUsers.getById),
  rest.post(baseUrl("/users"), mockUsers.create),

  rest.get(baseUrl("/draft-albums"), mockDraftAlbums.get),
  rest.get(baseUrl("/draft-albums/:id"), mockDraftAlbums.getById),
  rest.get(baseUrl("/albums"), mockPublishedAlbums.get),
];
