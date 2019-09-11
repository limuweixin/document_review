<template>
    <div id="main">
        <el-container>
            <el-aside class="menuSide"><navmenu></navmenu></el-aside>
            <el-container>
                <el-header>
                    <topbar></topbar>
                </el-header>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Navmenu from './components/NavMenu'
    import Topbar from './components/topBar'
    import { Container,Card,Button  } from 'element-ui'
    export default {
        name: "layout",
        components:{
            Navmenu,
            Topbar,
            [Container.name]:Container,
            [Card.name]:Card,
            [Button.name]:Button
        }
    }
</script>

<style scoped>
#main{
    height: 100%;
}
.el-container{
    height: 100%;
}
.el-main{
    padding-bottom: 0;
}
.menuSide{
    width: auto !important;
    border-right: solid 1px #e6e6e6;
    background-color: rgb(84, 92, 100);
}

</style>