<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>评审文档提交</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文档上传">
                <el-upload class="upload-demo"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :on-preview="handlePreview"
                           :on-remove="handleRemove"
                           :before-remove="beforeRemove"
                           :on-success="success"
                           multiple
                           :limit="1"
                           :on-exceed="handleExceed"
                           :file-list="fileList"
                           :data="data">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="文档名称">
                <el-input v-model="form.name" disabled="disabled"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="文档版本"><el-input v-model="form.docEdition" placeholder="请输入内容"></el-input></el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="产品版本"><el-input v-model="form.proEdition" placeholder="请输入内容"></el-input></el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="产品线">
                <el-select v-model="form.region" placeholder="请选择产品线">
                    <el-option label="产品线一" value="shanghai"></el-option>
                    <el-option label="产品线二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评审时间">
                <el-date-picker
                        v-model="form.datatime"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    import { Form,Button ,Input,  Select,FormItem,TimePicker,DatePicker, Upload,Container,Card} from 'element-ui'
    export default {
        name: "publish",
        components:{
            [Form.name]:Form,
            [Button.name]:Button,
            [Input.name]:Input,
            [Select.name]:Select,
            [TimePicker.name]:TimePicker,
            [FormItem.name]:FormItem,
            [DatePicker.name]:DatePicker,
            [Upload.name]:Upload,
            [Container.name]:Container,
            [Card.name]:Card
        },
        data() {
            return {
                form: {
                    name: '',
                    docEdition:'',
                    proEdition:'',
                    region: '',
                    datatime: ''
                },
                fileList: [],
                data:{
                    name:'xueyu',
                    time:'2019'
                }
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            success(response, file, fileList){
                this.form.name = fileList[0].name.split(".")[0];
                console.log(fileList);
            },
            onSubmit() {
                console.log('submit!');
                var filename = "";
                var url = "";
                this.$alert('请复制链接前往评审:'+url, '标题名称', {
                    confirmButtonText: '确定',
                    callback: action => {

                    }
                });
            }
        }
    }
</script>

<style scoped>
.el-form{
    width: 536px;
    margin: 10px auto;
}
.el-select{
    width: 100%;
}
.el-date-editor--datetimerange{
    width: 100%;
}
</style>