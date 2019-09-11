<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
             :router="ifrouter"
             @open="handleOpen"
             @close="handleClose"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             :collapse="isCollapse"
             @select = "pickToList">
        <el-menu-item index="/home">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">欢迎页</span>
            </template>
        </el-menu-item>
        <el-submenu index="/home/treatList">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">我的工作</span>
            </template>
            <el-menu-item index="/home/treatList">待审评</el-menu-item>
            <el-menu-item index="/home/publishList">已发布</el-menu-item>
            <el-submenu class="overSub" index="/home/partakeOverList">
                <template slot="title">已完成</template>
                <el-menu-item index="/home/partakeOverList">参与的评审</el-menu-item>
                <el-menu-item index="/home/publishOverList">发起的评审</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="/home/publish">
            <i class="el-icon-menu"></i>
            <span slot="title">发起评审</span>
        </el-menu-item>
        <el-menu-item index="/home/webviewer">
            <i class="el-icon-menu"></i>
            <span slot="title">测试合作webview</span>
        </el-menu-item>
        <el-menu-item index="/home/reply_webviewer">
            <i class="el-icon-menu"></i>
            <span slot="title">测试回复webview</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    /* eslint-disable */
    import { Menu,Submenu,MenuItem,MenuItemGroup } from 'element-ui'
    export default {
        name: "navmenu",
        data() {
            return {
                isCollapse: false,
                ifrouter:true
            };
        },
        components:{
            [Menu.name]:Menu,
            [Submenu.name]:Submenu,
            [MenuItem.name]:MenuItem,
            [MenuItemGroup.name]:MenuItemGroup
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            toPage(pathname){
                this.$router.push({"path":"/"+pathname});
            },
            pickToList(index,indexPath){
                if(index.indexOf("treatList")>-1){
                    //this.$store.state.listParams = "treat";
                    this.$store.commit('changeListParams', "treat")
                }else if(index.indexOf("publishList")>-1){
                    this.$store.commit('changeListParams', "publish")
                }else if(index.indexOf("partakeOverList")>-1 || index.indexOf("publishOverList")>-1 ){
                    this.$store.commit('changeListParams', "finished")
                }
            }
        }
    }
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    background-color: rgb(84, 92, 100);
    width: 200px;
    min-height: 400px;
    text-align: left;
}
.el-submenu .el-menu-item{
    padding-left: 55px !important;
}
.overSub{
    overflow: hidden;
}
/deep/.overSub .el-submenu__title{
    padding-left: 56px !important;
}
/deep/.overSub .el-menu-item{
    padding-left: 71px !important;
}
</style>