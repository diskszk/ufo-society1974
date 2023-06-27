/* eslint-disable import/no-default-export */

import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Component } from "./AlbumListItem";
import { mockAlbums } from "../../../../mocks/mockData";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "components/AlbumListItem",
  component: Component,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof Component>;

type Props = ComponentProps<typeof Component>;

export const AlbumListItem: ComponentStoryObj<typeof Component> = {
  args: {
    handleClickAlbum: () => void 0,
    album: mockAlbums[0],
  } as Props,
};
