import type { Meta, StoryObj } from "@storybook/react";
import { Presentation as AlbumTable } from "../../components/albums/AlbumTable";

const meta: Meta<typeof AlbumTable> = {
  title: "components/AlbumTable",
  component: AlbumTable,
  decorators: [
    (Story) => (
      <div className="album-container">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AlbumTable>;

export const NoAlbums: Story = {
  args: {
    albums: [],
  },
};
