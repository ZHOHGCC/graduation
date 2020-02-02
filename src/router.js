import Vue from 'vue'
import Router from 'vue-router'






const Login = () => import('./views/Login.vue')
const Notfind = () => import('./views/404')
// -------------------------------------老师的路由
const TeacherIndex = () => import('./views/Teacher/index.vue')
const TeacherList = () => import('./views/Teacher/List/list.vue')
const TeacherReport = () => import('./views/Teacher/Report/report.vue')
const TeacherPaper = () => import('./views/Teacher/Paper/paper.vue')
const TeacherTask = () => import('./views/Teacher/Task/task.vue')
const TeacherInformation = () => import('./views/Teacher/Information/information.vue')
const TeacherTaskList = () => import('./views/Teacher/Task/taskList.vue')

Vue.use(Router)

const router = new Router({
    mode: 'history',

    routes: [{
        path: '*',
        name: '/404',
        component: Notfind
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/teacher',
        component: TeacherIndex,
        children: [
            {
                path: 'list',
                name: 'TeacherList',
                component: TeacherList
            },
            {
                path: 'report',
                name: 'TeacherReport',
                component: TeacherReport
            },
            {
                path: 'paper',
                name: 'TeacherPaper',
                component: TeacherPaper
            },
            {
                path: 'task',
                name: 'TeacherTask',
                component: TeacherTask
            },
            {
                path: 'information',
                name: 'TeacherInformation',
                component: TeacherInformation
            },
            {
                path: 'taskList',
                name: 'TeacherTaskList',
                component: TeacherTaskList
            },
        ]
    },


    ]
})

// 添加路由守卫!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.token ? true : false;
    if (to.path == "/login") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
})

export default router;