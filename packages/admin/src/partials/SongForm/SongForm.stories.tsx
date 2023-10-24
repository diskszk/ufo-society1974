import { Meta, StoryObj } from "@storybook/react";
import { SongForm } from "./SongForm";
import { createMockSong } from "@ufo-society1974/factories";

const meta: Meta<typeof SongForm> = {
  component: SongForm,
  title: "partials/SongForm",
};

export default meta;

type Story = StoryObj<typeof SongForm>;
export const Create: Story = {};

const testData = createMockSong("02");

export const Edit: Story = {
  args: {
    currentValues: { ...testData, trackId: Number(testData.id) },
  },
};
