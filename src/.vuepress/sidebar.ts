import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/guide/": [
    "",
    {
      text: "安装",
      icon: "install",
      prefix: "install/",
      children: [
        "thinkphp",
        "laravel",
        "hyperf",
        "other",
      ],
    },
    "changelog"
  ],
  "/config/": [
    "",
    "fe",
  ],
  "/use/": [
    "",
    {
      text: "编写注释",
      icon: "edit",
      prefix: "notes/",
      children: [
        "useFile",
        "controller",
        "api",
      ],
    },
    {
      text: "功能使用",
      icon: "extend",
      prefix: "function/",
      children: [
        "apps",
        "controllerGroup",
        "password",
        "cache",
        "docs",
        "lang",
        "debugEvent",
        "mock",
        "generator"
      ],
    },
  ],
  "/help/": [
    "notConfig",
    "500",
  ],
});

