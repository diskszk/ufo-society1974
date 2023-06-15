import type { Meta, StoryObj } from "@storybook/react";
import { ResetForm } from "./ResetForm";
import { within, userEvent } from "@storybook/testing-library";

const meta: Meta<typeof ResetForm> = {
  title: "Partials/Reset",
  component: ResetForm,
};

export default meta;

type Story = StoryObj<typeof ResetForm>;

export const Default: Story = {
  args: {
    onSubmit: () => void 0,
  },
};

export const ValidEmail: Story = {
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole("textbox", { name: "E-mail" }),
      "test@example.com"
    );
    await userEvent.tab();
  },
};
export const InvalidEmail: Story = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole("textbox", { name: "E-mail" }),
      "1234"
    );
    await userEvent.tab();
  },
};
