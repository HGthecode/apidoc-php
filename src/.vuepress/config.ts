import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { path } from "@vuepress/utils";


export default defineUserConfig({
  lang: "zh-CN",
  title: "Apidoc",
  description: "Apidoc使用文档",

  base: "/",

  theme,
  plugins: [
    docsearchPlugin({
      // 你的选项
      // appId, apiKey 和 indexName 是必填的
      appId:"",
      apiKey:"",
      indexName:""
    }),
    
  ],
  alias: {
    "@DownloadFe":  path.resolve(__dirname, "components/DownloadFe.vue"),
  },
});
