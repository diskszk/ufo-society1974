import { Meta, StoryObj } from "@storybook/react";
import { AlbumListItem } from "./AlbumList";
import { createMockAlbum } from "@ufo-society1974/factories";
import { NO_IMAGE } from "../../constants";

const meta: Meta<typeof AlbumListItem> = {
  title: "partials/AlbumListItem",
  component: AlbumListItem,
  decorators: [
    (Story) => (
      <div className="album-container">
        <ul className="album-list">
          <Story />
        </ul>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AlbumListItem>;

export const Default: Story = {
  args: {
    album: createMockAlbum("01", { image: NO_IMAGE.toString() }),
    label: "編集",
    status: "edit",
  },
};
