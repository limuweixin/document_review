<template>
    <div id="main">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="224px">
                    <navmenu></navmenu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import navmenu from '@/components/NavMenu'
    import { Container,Card,Button  } from 'element-ui'
    export default {
        name: "index",
        components:{
            navmenu,
            [Container.name]:Container,
            [Card.name]:Card,
            [Button.name]:Button
        }
    }
</script>

<style scoped>
.text {
    font-size: 14px;
}
.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

</style>