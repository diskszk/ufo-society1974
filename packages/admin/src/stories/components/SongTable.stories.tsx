import type { Meta, StoryObj } from "@storybook/react";
import { Presentation as SongTable } from "../../components/songs/SongTable";

const meta: Meta<typeof SongTable> = {
  title: "components/SongTable",
  component: SongTable,
};

export default meta;

type Story = StoryObj<typeof SongTable>;

export const NoSongs: Story = {
  args: {
    role: "editor",
    handleClickAddIcon: () => void 0,
    songs: [],
  },
};
