import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: { onClick: { action: "clicked" } },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const button: Story = {
  args: {
    id: "defaultButton",
    children: "Button",
  },
};

export const defaultButton: Story = {
  args: {
    id: "defaultButton",
    children: "Default Button",
  },
};
