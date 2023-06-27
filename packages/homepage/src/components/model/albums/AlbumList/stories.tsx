/* eslint-disable import/no-default-export */

import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { AlbumList } from "./AlbumList";
import { mockAlbums } from "../../../../mocks/mockData";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "components/AlbumList",
  component: AlbumList,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof AlbumList>;

type Props = ComponentProps<typeof AlbumList>;

export const AlbumListItem: ComponentStoryObj<typeof AlbumList> = {
  args: {
    albums: mockAlbums,
  } as Props,
};
