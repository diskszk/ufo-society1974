import type { Meta, StoryObj } from "@storybook/react";
import { AlbumForm } from "./AlbumForm";
import { mockAlbums } from "../../stories/mockData";
import { ROLE } from "../../constants";

const meta: Meta<typeof AlbumForm> = {
  title: "Partials/AlbumForm",
  component: AlbumForm,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

type Story = StoryObj<typeof AlbumForm>;

export const NoData: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  args: {
    role: ROLE.EDITOR,
  },
};

export const ExistData: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
  args: {
    role: ROLE.EDITOR,
    album: mockAlbums[0],
  },
};
