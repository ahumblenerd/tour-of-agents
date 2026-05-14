import type { Meta, StoryObj } from "@storybook/react-vite";
import { TryThisNowSidebar } from "./try-this-now-sidebar";

const meta: Meta<typeof TryThisNowSidebar> = {
  component: TryThisNowSidebar,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-12">
        <p className="text-sm text-muted-foreground">
          Article body would render here. The sidebar floats on the right at
          large breakpoints.
        </p>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const LessonOne: StoryObj<typeof TryThisNowSidebar> = {
  args: { slug: "agent-function", lessonNumber: 1 },
};

export const DeepLesson: StoryObj<typeof TryThisNowSidebar> = {
  args: { slug: "self-scheduling", lessonNumber: 8 },
};
