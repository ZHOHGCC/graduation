import Vue from 'vue'
import Router from 'vue-router'






const Login = () => import('./views/Login.vue')
const Notfind = () => import('./views/404')

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
        name: 'login',
        component: Login
    },
        //   {
        //     path: '/add',
        //     name: 'add',
        //     component: addBlog
        //   },
        //   {
        //     path: '/index',
        //     component: Index,
        //     children: [
        //       {
        //         path: '/home',
        //         name: 'home',
        //         component: home
        //       },
        //       {
        //         path: '/blog',
        //         name: 'blog',
        //         component: blog,
        //         children: [
        //           {
        //             path: '/items',
        //             name: 'items',
        //             component: items
        //           },
        //           {
        //             path: '/article/:id',
        //             name: 'article',
        //             component: article
        //           },
        //         ]
        //       },
        //     ]
        //   },


    ]
})

// 添加路由守卫!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.Authentication ? true : false;
    if (to.path != "/add") {
        next();
    } else {
        isLogin ? next() : next("/login");
    }
})

export default router;