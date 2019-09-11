<template>
  <div class="main">
    <div ref='viewer'></div>
    <input id="file-picker" type="file" accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx,.pptx,.md">
    <el-button style="float: right; padding: 3px 0" type="text" @click="onSubmit">提交</el-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'reply_webviewer',
  data(){
    return {
      docViewerCopy:null,
      publicPath: process.env.BASE_URL
    }
  },
  computed:{
      path(){
        return `${this.publicPath}lib`
      }
  },
  components:{

  },
  mounted: function () {
    var that = this;
        WebViewer({
            path: this.path,
            initialDoc: "https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf"  // this.url, // replace with your own PDF file
          }, this.$refs.viewer).then((instance) => {
            // call apis here
            //上传文件、打开文件
            document.getElementById('file-picker').onchange = function(e) {
              var file = e.target.files[0];
              if (file) {
                instance.loadDocument(file);
              }
            };
            //设置用户
          instance.setAnnotationUser('XUEYU');
          instance.setAdminUser(false);
          instance.setReadOnly(false);
          instance.setLocked(true);
          instance.openElement('notesPanel');

          var docViewer = instance.docViewer;
          that.docViewerCopy = instance.docViewer;
          var annotManager = instance.annotManager;

          /*docViewer.on('documentLoaded', function() {
              var doc = docViewer.getDocument();
              // include annotations with the document
              var options = {
                xfdfString: docViewer.getAnnotationManager().exportAnnotations()
              };
              doc.getFileData(options).then(function(data) {
                var arr = new Uint8Array(data);
                var blob = new Blob([arr], { type: 'application/pdf' });

                // upload blob to your server
              });
          });*/

          /*annotManager.on('annotationChanged', function() {
          //下载注释
            var doc = docViewer.getDocument();
            var options = {
              xfdfString: docViewer.getAnnotationManager().exportAnnotations()
            };
            doc.getFileData(options).then(function(data) {
              var arr = new Uint8Array(data);
              var blob = new Blob([arr], { type: 'application/pdf' });
              window.saveAs(blob, 'downloaded.pdf');
            });
          });*/
        });
    },
  methods:{
    onSubmit(){
      //下载注释文件
      /*var that = this;
     var doc = that.docViewerCopy.getDocument();
      var options = {
        xfdfString: that.docViewerCopy.getAnnotationManager().exportAnnotations()
      };
      doc.getFileData(options).then(function(data) {
        var arr = new Uint8Array(data);
        var blob = new Blob([arr], { type: 'application/pdf' });
        window.saveAs(blob, 'downloaded.pdf');
      });*/
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 100%; 
  height: 100vh;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
