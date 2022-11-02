import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: "HG",
    url: "https://github.com/HGthecode",
  },

  iconAssets: "iconfont",

  logo: "/logo.png",

  repo: "HGthecode/apidoc-php",

  docsDir: "tree/docs",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: `<div>感谢每一位支持的朋友 | 点个Star呗 <a href="https://github.com/HGthecode/apidoc-php" target="_blank"><i class="iconfont icon-github" style="margin-right:5px;"></i>GitHub</a></div>`,

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  navbarLayout:{
    left: ["Brand"],
    center: [],
    right: ["Search","Links","Language", "Repo", "Outlook", ],
  },
  encrypt: {
    config: {
    },
  },

  plugins: {
    blog:false,
    photoSwipe:{},
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imageSize: true,
      include: true,
      lazyLoad: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tex: true,
      vpre: true,
      vuePlayground: true,
    },
  },
});
