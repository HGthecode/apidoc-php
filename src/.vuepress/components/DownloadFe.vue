<template>
   <div class="download-wraper">
        <a 
            title="点击下载"
            class="download-item gitee" 
            target="downloadFile" 
            href="https://github.com/HGthecode/apidoc-ui/releases/download/latest/apidoc.zip"
        >
            <div class="title">Gitee(推荐)</div>
            <div >v1.0.1</div>
        </a>
        <a 
            title="点击下载"
            class="download-item github" 
            target="downloadFile" 
            href="https://github.com/HGthecode/apidoc-ui/releases/download/latest/apidoc.zip"
        >
            <div class="title">Github</div>
            <div>v1.0.1</div>
        </a>
   </div>
</template>

<style lang="css" scoped>
.download-wraper{
    display: flex;
}
.download-item{
    flex: 1;
    padding:10px;
    text-align: center;
    margin:5px;
    cursor: pointer;
    color:#fff;
    border-radius: 3px;
    display: block;
}
.download-item .title{
    font-size: 18px;
}
.gitee{
    background: #fe7300;
}
.gitee:hover{
    background: #e07b53;
}
.github{
    background: #57606a;
}
.github:hover{
    background: #24292f;
}
</style>
