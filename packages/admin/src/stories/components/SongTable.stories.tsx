import type { Meta, StoryObj } from "@storybook/react";
// import { Presentation as SongTable } from "../../components/songs/SongTable";
import { DummyComponent } from "./Dummy";

const meta: Meta<typeof DummyComponent> = {
  title: "components/SongTable",
  component: DummyComponent,
};

export default meta;

type Story = StoryObj<typeof DummyComponent>;

export const NoSongs: Story = {};
