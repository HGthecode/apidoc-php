import { defineUserConfig } from "vuepress";
import { path } from "@vuepress/utils";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Apidoc",
  description: "Apidoc使用文档",

  theme,
  alias: {
    "@DownloadFe": path.resolve(__dirname, "components/DownloadFe.vue"),
  },
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
