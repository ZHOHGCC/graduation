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
const TeacherDetail = () => import('./views/Teacher/List/detail.vue')
const TeacherPassWorld = () => import('./views/Teacher/Information/passWorld.vue')

//--------------------------------------学生的路由
const StudentIndex = () => import('./views/Student/index.vue')
const StudentInformation = () => import('./views/Student/Information/information.vue')
const StudentList = () => import('./views/Student/Task/taskList.vue')
const StudentPaper = () => import('./views/Student/paper/studentPaper.vue')
const StudentPassWorld = () => import('./views/Student/Information/passWorld.vue')
const StudentReport = () => import('./views/Student/Report/report.vue')
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
            }, {
                path: 'teacherPassWorld',
                name: 'TeacherPassWorld',
                component: TeacherPassWorld
            },
            {
                path: 'taskList',
                name: 'TeacherTaskList',
                component: TeacherTaskList

            },
            {
                path: 'taskDetail/:id',
                name: 'TeacherDetail',
                component: TeacherDetail

            },


        ]
    },
    {
        path: '/student',
        component: StudentIndex,
        children: [
            {
                path: 'StudentInformation',
                name: 'StudentInformation',

                component: StudentInformation
            }, {
                path: 'Studentlist',
                name: 'StudentList',
                component: StudentList
            }, {
                path: 'StudentPaper',
                name: 'StudentPaper',
                component: StudentPaper
            }, {
                path: 'StudentPassWorld',
                name: 'StudentPassWorld',
                component: StudentPassWorld
            }, {
                path: 'StudentReport',
                name: 'StudentReport',
                component: StudentReport
            }
        ]
    }

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