import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/',
        name: 'login',
        component: ()=>import('@/pages/login')
    },
    {
        path: '/home',
        name: 'layout',
        redirect:'home',
        component: ()=>import('@/pages/layout/layout'),
        children:[
            {
                path: '',
                name: 'home',
                component: ()=>import('@/pages/home')
            },
            {
                path: 'publish',
                name: 'publish',
                component: ()=>import('@/pages/publish/publish')
            },
            {
                path: 'treatList',
                name: 'treatList',
                component: ()=>import('@/pages/mywork/treatList')
            },
            {
                path: 'publishList',
                name: 'publishList',
                component: ()=>import('@/pages/mywork/treatList')
            },
            {
                path: 'partakeOverList',
                name: 'partakeOverList',
                component: ()=>import('@/pages/mywork/treatList')
            },
            {
                path: 'publishOverList',
                name: 'publishOverList',
                component: ()=>import('@/pages/mywork/treatList')
            },
            {
                path: 'webviewer',
                name: 'webviewer',
                component: ()=>import('@/components/collaboration/client/collWebviewer')
            },
            {
                path: 'reply_webviewer',
                name: 'reply_webviewer',
                component: ()=>import('@/components/reply_webviewer')
            }
        ]
    }
]
export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

