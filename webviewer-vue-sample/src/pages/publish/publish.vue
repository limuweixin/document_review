<template>
    <div class="model-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>评审文档提交</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="resetForm('publishForm')">重置</el-button>
            </div>
            <el-form ref="publishForm" :model="publishForm" label-width="80px" status-icon :rules="rules">
                <el-form-item label="文档上传" required prop="fileList">
                    <el-upload class="upload-demo"
                               action="https://jsonplaceholder.typicode.com/posts/"
                               :on-preview="handlePreview"
                               :on-remove="handleRemove"
                               :before-remove="beforeRemove"
                               :on-success="success"
                               multiple
                               :limit="1"
                               :on-exceed="handleExceed"
                               :file-list="publishForm.fileList"
                               :data="data">
                        <el-button size="small" class="uploadBtn" type="primary"><i class="fa fa-cloud-upload" style="padding-right:5px"/>点击上传</el-button>
                    </el-upload>
                    <el-alert title="只支持上传word格式文件，文件不能超过200MB" type="info"></el-alert>
                </el-form-item>
                <el-form-item label="文档名称" required prop="name">
                    <el-input v-model="publishForm.name" disabled="disabled"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="文档版本" required prop="docEdition"><el-input v-model="publishForm.docEdition" placeholder="请输入内容"></el-input></el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品版本" required prop="proEdition"><el-input v-model="publishForm.proEdition" placeholder="请输入内容"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="产品线" required prop="pipeline">
                    <el-select v-model="publishForm.pipeline" placeholder="请选择产品线">
                        <el-option label="产品线一" value="shanghai"></el-option>
                        <el-option label="产品线二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评审时间" required prop="assessTime">
                    <el-date-picker
                            v-model="publishForm.assessTime"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="评审说明" prop="assessDesc">
                    <el-input type="textarea" v-model="publishForm.assessDesc"></el-input>
                </el-form-item>
                <el-form-item label="参与评审人" required prop="pickPerson">
                    <div calss="assessPerson">
                        <span v-if="noperson" class="fa fa-pencil pickPerson" @click="pickAssessPersonVisible = true">选择评审人</span>
                        <span v-else class="fa fa-pencil pickPerson" @click="pickAssessPersonVisible = true">{{assessPersonList}}</span>
                    </div>
                </el-form-item>
                <el-form-item class="btnContainer">
                    <el-button type="primary" @click="onSubmit('publishForm')">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!--选择评审人弹框-->
        <el-dialog title="选择评审人员" :visible.sync="pickAssessPersonVisible" center width="36%">
            <transfer></transfer>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelPickPerson">取 消</el-button>
                <el-button type="primary" @click="pickAssessPerson">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Transfer from "../../components/Transfer";
    export default {
        name: "publish",
        components:{
            Transfer
        },
        data() {
            //表单校验
            var checkUploadFile = (rule, value, callback) => {
                debugger
                if (!value) {
                    return callback(new Error('请选择要上传的文件'));
                }else{
                    callback();
                }
            };
            var checkpickPerson = (rule, value, callback) => {
                if (this.$store.state.publish.sure_assessPerson.length===0) {
                    return callback(new Error('请选择参与评审人员'));
                }else{
                    callback();
                }
            };
            return {
                publishForm: {
                    fileList: [],
                    name: '',
                    docEdition:'',
                    proEdition:'',
                    pipeline: '',
                    assessTime: '',
                    assessDesc:""
                },
                rules: {
                    fileList:[{validator:checkUploadFile,required: true, message: '请上传文档',trigger: 'change'} ],
                    name: [{required: true, message: '文档名称不为空', trigger: 'blur' }],
                    docEdition: [{required: true, message: '请输入文档版本', trigger: 'blur' }],
                    proEdition: [{ required: true, message: '请输入产品版本', trigger: 'blur'}],
                    pipeline:[{ required: true, message: '请选择产品线', trigger: 'change'}],
                    assessTime:[{ required: true, message: '请选择评审时间', trigger: 'blur' }],
                    assessDesc:[{ message: '请输入200字以内的评审文档说明', trigger: 'blur'}, { min: 0, max: 200, message: '请输入200字以内的评审文档说明', trigger: 'blur' }],
                    pickPerson:[{required: true,message: '请选择参与评审人员', validator:checkpickPerson,trigger: 'change'}]
                },
                data:{
                    name:'xueyu',
                    time:'2019'
                },
                pickAssessPersonVisible:false,
                noperson:true,
                assessPersonList:null
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
                this.publishForm.name = fileList[0].name.split(".")[0];
                console.log(fileList);
            },
            pickAssessPerson(){
                var sure_assessPerson = this.$store.state.publish.assessPerson;
                var sure_assessPersonKey = this.$store.state.publish.assessPersonKey;
                this.$store.commit('setSureAssessPerson', {sure_assessPerson,sure_assessPersonKey})
                this.assessPersonList = this.$store.state.publish.sure_assessPerson.join(',')
                this.pickAssessPersonVisible = false
                this.noperson = false
            },
            cancelPickPerson(){
                this.pickAssessPersonVisible = false
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交评审文档并发邀请相关成员评审？', '操作提醒', {
                            distinguishCancelAndClose: true,
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                        }).then(() => {
                                this.$message({
                                    type: 'info',
                                    message: '提交成功'
                                });
                                this.$router.push('/home/publish');
                            })
                            .catch(action => {
                                this.$message({
                                    type: 'info',
                                    message: '提交失败'
                                });
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
.upload-demo{
    text-align: left;
    width: 100%;
}
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
/deep/.el-upload{
    display: flex;
    flex-direction: unset;
    align-items: center;
}
.uploadBtn{
    height: 37px;
}
.el-alert{
    padding: 0 10px;
    margin-left: 10px;
    position: absolute;
    width: auto;
    right: 0;
    padding-right: 29px;
}
/deep/.el-form-item__label{
    width: 95px !important;
}
/deep/.el-form-item__content{
    margin-left: 95px !important;
    display: flex;
    justify-content: start;
}
.btnContainer{
    margin-top:65px;
}
.pickPerson{
    text-decoration: underline;
    color: #35c7bbc7;
    cursor: pointer;
}
/deep/.el-alert__closebtn{
    top: 14px;
}
</style>