import type { Meta, StoryObj } from "@storybook/react";
import { AlbumForm } from "./AlbumForm";
import { ROLE } from "../../constants";
import { createMockAlbum } from "@ufo-society1974/factories";

const meta: Meta<typeof AlbumForm> = {
  title: "Partials/AlbumForm",
  component: AlbumForm,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

const mockData = {
  album: createMockAlbum("01"),
};

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
    album: mockData.album,
  },
};
