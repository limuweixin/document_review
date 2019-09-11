<template>
    <div class="model-container">
        <el-card shadow="never">
            <div slot="header" class="clearfix searchHeader">
                <span><i class="fa fa-search marginRight"></i>快捷搜索</span>
                <div class="btns-wrapper-right">
                    <el-button type="primary" plain @click="seachFun">确定</el-button>
                    <el-button type="warning" plain @click="resetFun" :disabled="isActiveReset">重置</el-button>
                </div>
            </div>
            <el-row :gutter="15">
                <el-col :xl="4" :lg="6" :md="6" :sm="8">
                    <el-col class="input-name" :span="9">文档名称</el-col>
                    <el-col :span="15">
                        <el-input
                                placeholder="请输入关键字"
                                v-model="seacherParam.docName"
                                @keyup.enter.native="seachFun"
                        ></el-input>
                    </el-col>
                </el-col>

                <el-col :xl="4" :lg="6" :md="6" :sm="8">
                    <el-col class="input-name" :span="9">评审发起人</el-col>
                    <el-col :span="15">
                        <el-select v-model="seacherParam.promoter" placeholder="请选择">
                            <el-option
                                    v-for="item in promoterData"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
        </el-card>

        <el-card>
            <div slot="header" class="clearfix textLeft">
                 <span><i class="fa fa-table marginRight"></i>表格数据</span>
            </div>
            <div class="table-wrapper">
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        stripe
                        align="center"
                        :header-row-class-name="centerHeader">
                    <el-table-column
                            label="文档名称" >
                        <template slot-scope="scope">
                            <span style="margin-left: 10px;font-size: 18px;">{{ scope.row.docName }}</span>
                            <div style="margin-left: 10px">{{ `距离评审结束还有：${scope.row.assessOverTimeGap}` }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="评审发起人"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.name }}</p>
                                <p>住址: {{ scope.row.address }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="已审评数"
                            width="180">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.assessNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div v-if="$store.state.assessList.listParams==='treat'">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">评审</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">转发</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">完成</el-button>
                            </div>
                            <div v-else-if="$store.state.assessList.listParams==='publish'">
                                <el-button
                                        size="mini"
                                        @click="reply(scope.$index, scope.row)">回复</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">邀请</el-button>
                            </div>
                            <div v-else-if="$store.state.assessList.listParams==='finished'">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">查看明细</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "treatList",
        data() {
            return {
                seacherParam:{docName:"",promoter:""},
                promoterData:[{code:1,name:'xueyu'}],
                tableData: [{
                    docName: '显示屏调试软件 NovaLCT ST0.0.1',
                    assessOverTimeGap:'38分钟',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    assessNum:'12'
                }, {
                    docName: '同步播放软件 NovaStudio VT 1.0.3',
                    assessOverTimeGap:'1分钟',
                    name: '王小虎',
                    address: '海市普',
                    assessNum:'1'
                }, {
                    docName: '安卓多媒体播放软件 ViPlex',
                    assessOverTimeGap:'20分钟',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    assessNum:'2'
                }, {
                    docName: '视频拼接软件 V-Can SZ 9.028',
                    assessOverTimeGap:'3分钟',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    assessNum:'0'
                }]
            }
        },
        computed: {
            // 激活重置按钮
            isActiveReset() {
                for (const key in this.seacherParam) {
                    if (this.seacherParam[key] === 0 || this.seacherParam[key]) {
                        return false;
                    }
                }
                return true;
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            reply(index, row){

            },
            seachFun() {

            },
            resetFun() {},
            centerHeader(){
                return 'centerHeader'
            }
        }
    }
</script>

<style scoped>
.centerHeader{
    text-align: center;
}
</style>