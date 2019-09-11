<template>
    <div style="text-align: center">
        <el-transfer
                style="text-align: left; display: inline-block"
                v-model="value"
                filterable
                :left-default-checked="[]"
                :right-default-checked="[]"
                :render-content="renderFunc"
                :titles="['可选用户', '已选用户']"
                :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
                  }"
                @change="handleChange"
                :data="data">
        </el-transfer>
    </div>
</template>

<script>
    export default {
        name: "Transfer",
        props:['checkedAssessPerson'],
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: '张奎',
                        dept:'三部门',
                        id:108
                    });
                }
                return data;
            };
            return {
                data: generateData(),
                value: this.$store.state.publish.sure_assessPersonKey,
                renderFunc(h, option) {
                    return <span>工号{ option.id } - {option.label } - {option.dept }</span>;
                }
            };
        },
        methods: {
            handleChange(value, direction, movedKeys) {
                var assessPerson = [],assessPersonKey=[];
                this.data.filter((item, index)=>{
                    if(value.indexOf(item.key)>-1){
                        assessPerson.push(item.label)
                        assessPersonKey.push(item.key)
                    }
                })
                this.$store.commit('setAssessPerson', {assessPerson,assessPersonKey})
            }
        }
    }
</script>

<style scoped>
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}
</style>