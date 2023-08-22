import type { Meta, StoryObj } from "@storybook/react";
import { DummyComponent } from "./Dummy";
// import { Presentation as AlbumTable } from "../../components/albums/AlbumTable";

const meta: Meta<typeof DummyComponent> = {
  title: "components/AlbumTable",
  component: DummyComponent,
  decorators: [
    (Story) => (
      <div className="album-container">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DummyComponent>;

export const NoAlbums: Story = {};
