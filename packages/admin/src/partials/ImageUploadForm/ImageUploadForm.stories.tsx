import { Meta, StoryObj } from "@storybook/react";
import { ImageUploadForm } from "./ImageUploadForm";
import { createMockAlbum } from "@ufo-society1974/factories";
import { THREE_SONGS } from "../../constants";

const meta: Meta<typeof ImageUploadForm> = {
  title: "Partials/ImageUploadForm",
  component: ImageUploadForm,
};

export default meta;

type Story = StoryObj<typeof ImageUploadForm>;

const mockFn = () => void 0;

export const Create: Story = {
  args: {
    setValue: mockFn,
  },
};
const { title, publishedDate } = createMockAlbum("01");
const mockData = {
  currentValue: {
    title,
    publishedDate,
    imageFile: THREE_SONGS,
  },
};

export const Edit: Story = {
  args: {
    setValue: mockFn,
    currentValues: mockData.currentValue,
  },
};
