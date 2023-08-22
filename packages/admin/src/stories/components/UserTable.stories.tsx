import type { Meta, StoryObj } from "@storybook/react";
// import { Presentation as UserTable } from "../../components/users/UserTable";
import { DummyComponent } from "./Dummy";

const meta: Meta<typeof DummyComponent> = {
  title: "components/UserTable",
  component: DummyComponent,
};

export default meta;

type Story = StoryObj<typeof DummyComponent>;

export const NoUsers: Story = {};
