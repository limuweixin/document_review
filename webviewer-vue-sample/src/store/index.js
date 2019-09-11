import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import assessList from './modules/assessList'
import publish from './modules/publish'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        assessList,
        publish
    }
})
export default store
