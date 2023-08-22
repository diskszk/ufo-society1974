import type { Meta, StoryObj } from "@storybook/react";
import { Presentation as UserTable } from "../../components/users/UserTable";

const meta: Meta<typeof UserTable> = {
  title: "components/UserTable",
  component: UserTable,
};

export default meta;

type Story = StoryObj<typeof UserTable>;

export const NoUsers: Story = {
  args: {
    role: "editor",
    handleClickAddIcon: () => void 0,
    users: [],
  },
};
