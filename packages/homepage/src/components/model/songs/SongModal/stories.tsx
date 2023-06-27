/* eslint-disable import/no-default-export */

import { ComponentMeta } from "@storybook/react";
import { Component as SongModal } from "./SongModal";
import { mockSongs } from "../../../../mocks/mockData";

export default {
  title: "components/modals",
  component: SongModal,
} as ComponentMeta<typeof SongModal>;

export const SongModalView = () => {
  return <SongModal song={mockSongs[0]} handleClose={() => void 0} />;
};
