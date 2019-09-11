<template>
    <el-menu class="navbar" mode="horizontal">
        <breadcrumb class="breadcrumb-container"></breadcrumb>
        <div class="right-menu">
            <div class="user-infro right-menu-item">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <span class="user-name">admin</span>
                <span class="user-branch">超级管理员</span>
            </div>
            <el-dropdown class="setting-wrapper right-menu-item" trigger="hover">
                <div class="setting-icon-wrapper"><i class="iconfont icon-shezhi"></i></div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item><i class="iconfont icon-shouye" style="margin-right:5px;"></i>首页</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span  style="display:block;"><i class="iconfont icon-tuichu1" style="margin-right:5px;"></i>退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-menu>
</template>

<script>
    import Breadcrumb from '@/components/Breadcrumb'
    export default {
        name: "topBar",
        components:{
            Breadcrumb
        }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .el-avatar{
        width: 35px;
        height: 35px;
        line-height: 35px;
        display: inline-table;
    }
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .breadcrumb-container{
        float: left;
        height: 50px;
        line-height: 50px;
    }
    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }
    .right-menu {
        float: right;
        &:focus{
            outline: none;
        }
        .right-menu-item {
            float: left;
            margin-right: 15px;
        }
        .screenfull {

        }
        .user-infro {
            cursor: pointer;
            position: relative;
            height: 50px;
            -webkit-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
            .user-icon{
                font-size: 20px;
                border: solid 1px #999;
                border-radius: 50%;
                color: #999;
                padding: 5px;
            }
            .user-name{
                position: relative;
                top: -2px;
                font-size: 14px;
                color:#666;
                padding: 0 6px;
            }
            .user-branch{
                position: relative;
                top: -3px;
                background: #ff0000;
                color: #fff;
                padding: 4px 8px;
                border-radius: 20px;
                font-size: 12px
            }
        }
        .setting-wrapper{
            height: 30px;
            .setting-icon-wrapper{
                i{
                    font-size: 20px;
                    color: #999;
                    cursor: pointer;
                    &:hover{
                        color: #333;
                    }
                }
            }
        }
    }
}
</style>
