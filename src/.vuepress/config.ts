import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { path } from "@vuepress/utils";
import { searchProPlugin } from "vuepress-plugin-search-pro";


export default defineUserConfig({
  lang: "zh-CN",
  title: "Apidoc",
  description: "Apidoc使用文档",

  base: "/",

  theme,
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          name: "category",
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          name: "tag",
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    }),
  ],
  alias: {
    "@DownloadFe":  path.resolve(__dirname, "components/DownloadFe.vue"),
  },
});
