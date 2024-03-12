import { MyPlugin } from "./MyPlugin";

import type { Config } from "tailwindcss";
import scrollBar from "tailwind-scrollbar";

const config = {
  darkMode: ["class"],
  content: [],
  plugins: [MyPlugin, scrollBar],
} satisfies Config;
export default config;
