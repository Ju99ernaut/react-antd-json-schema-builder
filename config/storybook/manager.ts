import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

const theme = create({
  base: "dark",

  brandTitle: "React JSON Schema Builder",
  brandTarget: "_self",
});

const configToolbar = {
  isFullscreen: false,
  enableShortcuts: false,
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
};

addons.setConfig({
  theme,
  ...configToolbar,
});
