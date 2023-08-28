import type { Meta, StoryObj } from "@storybook/react";
import { AlbumList } from "./AlbumList";
import { mockAlbums } from "../../stories/mockData";

const meta: Meta<typeof AlbumList> = {
  title: "Partials/AlbumTable",
  component: AlbumList,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

type Story = StoryObj<typeof AlbumList>;

const albums = [mockAlbums].flat();

export const DraftAlbumList: Story = {
  args: {
    albums: albums,
    role: "editor",
  },
};
