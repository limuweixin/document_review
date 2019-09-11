<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix">
            <span>评审人信息</span>
        </div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="部门信息">
                <el-select v-model="form.region" placeholder="请选择产品线">
                    <el-option label="产品线一" value="shanghai"></el-option>
                    <el-option label="产品线二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评审人姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="文档名称">
                <el-input v-model="form.filename"  disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="check">评审</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    import { Form,Button ,Input,  Select,FormItem} from 'element-ui'
    export default {
        name: "login",
        components:{
            [Form.name]:Form,
            [Button.name]:Button,
            [Input.name]:Input,
            [Select.name]:Select,
            [FormItem.name]:FormItem
        },
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    filename:"test.doxc"
                }
            }
        },
        methods:{
            check(){
                this.$router.push({"path":"/annotation"});
            }
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
.box-card {
    width: 657px;
}
.el-form{
    width: 536px;
    margin: 10px auto;
}
.el-select{
    width: 100%;
}
</style>