
const publish = {
    state: {
        assessPerson: [],  //选择的评审人员信息数组
        sure_assessPerson:[],   //确定后的，选择的评审人员信息数组
        assessPersonKey:[],  //选择的评审人员信息key的数组
        sure_assessPersonKey:[]  // 确定后的，选择的评审人员信息key的数组
    },

    mutations: {
        setAssessPerson (state,assessPersonObj) {
            // 变更状态
            state.assessPerson = assessPersonObj.assessPerson
            state.assessPersonKey = assessPersonObj.assessPersonKey
        },
        setSureAssessPerson (state,assessPersonObj) {
            // 变更状态
            state.sure_assessPerson = assessPersonObj.sure_assessPerson
            state.sure_assessPersonKey = assessPersonObj.sure_assessPersonKey
        }
    },

    actions: {

    }
}

export default publish
