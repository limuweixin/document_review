<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>评审</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <WebViewer :path="`${publicPath}lib`" url="https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf"/>
    </el-card>
</template>

<script>
    //https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf
    //http://overfly.xin/image-server/downloaded.pdf，https://www.fqyxa.com/file-server/downloaded.pdf
    import WebViewer from '@/components/WebViewer'
    import { Container,Card,Button  } from 'element-ui'
    export default {
        name: "annotation",
        data () {
            return {
                publicPath: process.env.BASE_URL
            }
        },
        components:{
            WebViewer,
            [Container.name]:Container,
            [Card.name]:Card,
            [Button.name]:Button
        }
    }
</script>

<style scoped>

</style>