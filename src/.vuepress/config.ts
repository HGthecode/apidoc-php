import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchPlugin } from "@vuepress/plugin-search";
import { path } from "@vuepress/utils";


export default defineUserConfig({
  lang: "zh-CN",
  title: "Apidoc",
  description: "Apidoc使用文档",

  base: "/",

  theme,
  plugins: [
    searchPlugin({}),
  ],
  alias: {
    "@DownloadFe":  path.resolve(__dirname, "components/DownloadFe.vue"),
  },
});
