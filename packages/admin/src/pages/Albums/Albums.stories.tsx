import { Meta, StoryObj } from "@storybook/react";
import { Presentation as Albums } from "./Albums.page";
import { createMockUser, createMockAlbum } from "@ufo-society1974/factories";
import { NO_IMAGE, THREE_SONGS } from "../../constants";

const meta: Meta<typeof Albums> = {
  title: "pages/Albums",
  component: Albums,
};

export default meta;

type Story = StoryObj<typeof Albums>;

const mockData = {
  signedInUser: createMockUser("test01", { role: "editor" }),
  draftAlbums: [
    createMockAlbum("draft-01", { image: NO_IMAGE.toString() }),
    createMockAlbum("draft-02", { image: NO_IMAGE.toString() }),
    createMockAlbum("draft-03", { image: NO_IMAGE.toString() }),
  ],
  publishedAlbums: [
    createMockAlbum("published-04", { image: THREE_SONGS.toString() }),
    createMockAlbum("published-05", { image: NO_IMAGE.toString() }),
  ],
};

export const Empty: Story = {
  args: {
    draftAlbums: [],
    publishedAlbums: [],
    signedInUser: mockData.signedInUser,
  },
};

export const ThreeDraftAlbumsAndTwoPublishedAlbums: Story = {
  args: {
    draftAlbums: mockData.draftAlbums,
    publishedAlbums: mockData.publishedAlbums,
    signedInUser: mockData.signedInUser,
  },
};
