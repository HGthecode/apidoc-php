import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "指南",
    icon: "creative",
    link: "/guide/",
  },
  {
    text: "配置",
    icon: "config",
    link: "/config/",
  },
  {
    text: "使用",
    icon: "note",
    link: "/use/",
  },
  {
    text: "帮助",
    icon: "question",
    link: "/help/",
  },
]);
