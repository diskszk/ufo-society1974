/* eslint-disable import/no-default-export */
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Button } from "./Button";

export default {
  title: "components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

type Props = ComponentProps<typeof Button>;

export const DefaultButton: ComponentStoryObj<typeof Button> = {
  args: {
    label: "ボタン",
    handleClick: () => void 0,
  } as Props,
};
