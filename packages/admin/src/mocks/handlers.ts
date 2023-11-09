import { rest } from "msw";
import mockUsers from "./resolvers/users";
import { WEB_API_BASE_URL } from "../constants";
import mockDraftAlbums from "./resolvers/draftAlbums";
import mockPublishedAlbums from "./resolvers/publishedAlbums";
import mockSongs from "./resolvers/songs";

const baseUrl = (path: string) => {
  return WEB_API_BASE_URL + path;
};

export const handlers = [
  rest.get(baseUrl("/users"), mockUsers.get),
  rest.get(baseUrl("/users/:id"), mockUsers.getById),
  rest.post(baseUrl("/users"), mockUsers.create),

  rest.get(baseUrl("/draft-albums"), mockDraftAlbums.get),
  rest.post(baseUrl("/draft-albums"), mockDraftAlbums.create),
  rest.get(baseUrl("/draft-albums/:id"), mockDraftAlbums.getById),
  rest.put(baseUrl("/draft-albums/:id"), mockDraftAlbums.update),
  rest.delete(baseUrl("/draft-albums/:id"), mockDraftAlbums.delete),
  rest.post(baseUrl("/draft-albums/:id/publish"), mockDraftAlbums.publish),

  rest.get(baseUrl("/albums"), mockPublishedAlbums.get),
  rest.get(baseUrl("/albums/:id"), mockPublishedAlbums.getById),
  rest.post(
    baseUrl("/albums/:id/unpublish"),
    mockPublishedAlbums.unpublishAlbum
  ),

  rest.get(baseUrl("/albums/:id/songs"), mockSongs.get),
  rest.get(baseUrl("/albums/:id/songs/:songId"), mockSongs.getById),
  rest.post(baseUrl("/albums/:id/songs"), mockSongs.create),
  rest.put(baseUrl("/albums/:id/songs/:songId"), mockSongs.update),
  rest.delete(baseUrl("/albums/:id/songs/:songId"), mockSongs.delete),
];
