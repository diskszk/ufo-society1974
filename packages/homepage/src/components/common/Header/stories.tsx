/* eslint-disable import/no-default-export */

import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Header } from "./Header";

export default {
  title: "components/header",
  component: Header,
} as ComponentMeta<typeof Header>;

export const DefaultHeader: ComponentStoryObj<typeof Header> = {
  args: {},
};
