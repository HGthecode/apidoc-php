<template>
  <div class="download-wraper">
    <a
      title="点击下载"
      class="download-item gitee"
      target="downloadFile"
      href="https://gitee.com/hg-code/apidoc-php/releases/download/v5.3.0-rc.1/apidoc.zip"
    >
      <span class="title">从Gitee下载</span>
    </a>
    <a
      title="点击下载"
      class="download-item github"
      target="downloadFile"
      href="https://github.com/HGthecode/apidoc-php/releases/download/v5.3.0-rc.1/apidoc.zip"
    >
      <span class="title">从Github下载</span>
    </a>
  </div>
</template>

<style lang="css" scoped>
.download-wraper {
  display: flex;
}
.download-item {
  flex: 1;
  padding: 10px;
  text-align: center;
  margin: 5px;
  cursor: pointer;
  color: #fff;
  border-radius: 3px;
  display: block;
}
.download-item .title {
  font-size: 18px;
}
.gitee {
  background: #fe7300;
}
.gitee:hover {
  background: #e07b53;
}
.github {
  background: #57606a;
}
.github:hover {
  background: #24292f;
}
</style>
