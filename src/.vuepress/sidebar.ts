import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/guide/": [
    "",
    {
      text: "安装",
      icon: "install",
      prefix: "install/",
      children: ["thinkphp", "webman", "laravel", "hyperf"],
    },
    "changelog",
    "update5",
  ],
  "/config/": ["", "fe"],
  "/use/": [
    "",
    {
      text: "编写注释",
      icon: "edit",
      prefix: "notes/",
      children: ["useFile", "controller", "api"],
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
        "generator",
        "codeTemplate",
        "autoRegisterRoutes",
        "parsesAnnotation",
        "apiShare",
        "apiExport",
      ],
    },
  ],
  "/help/": [
    {
      text: "常见问题",
      icon: "help",
      prefix: "problems/",
      children: ["notConfig", "404", "500", "autoUrl", "notApis"],
    },
    {
      text: "使用教程",
      icon: "book",
      prefix: "courses/",
      children: [
        // "tp5-install",
        // "tp6-install",
        // "lv8-install",
        // "hyperf-install",
        // "webman-install",
        "custom-responses",
        "custom-debug-event",
      ],
    },
  ],
});
