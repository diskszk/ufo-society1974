import { Meta, StoryObj } from "@storybook/react";
import { Presentation as Albums } from "./Albums";
import { mockUsers } from "../../stories/mockData";

const meta: Meta<typeof Albums> = {
  title: "pages/Albums",
  component: Albums,
};

export default meta;

type Story = StoryObj<typeof Albums>;

export const Empty: Story = {
  args: {
    draftAlbums: [],
    publishedAlbums: [],
    signedInUser: mockUsers[0],
  },
};
