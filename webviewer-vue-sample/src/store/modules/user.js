import { login } from '@/axios/login'

const user = {
    state: {
        userInfro: null
    },

    mutations: {
        SET_USER_INFRO: (state, userInfro) => {
            state.userInfro = userInfro
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            const loginName = userInfo.username.trim()
            const loginPassword = userInfo.password
            return new Promise((resolve, reject) => {
                login({ loginName, loginPassword }).then(res => {
                    if (res.data.code === "1") {
                        commit('SET_USER_INFRO', res.data.data)
                        resolve()
                    } else {
                        reject(res.data)
                    }
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
