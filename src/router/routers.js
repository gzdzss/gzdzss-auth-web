export default [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '首页',
        },
        component: () => import('@/components/Index')
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import('@/components/Login')
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            title: '注册',
        },
        component: () => import('@/components/Register')
    },
    {
        path: '/oauth2',
        name: 'Oauth2',
        meta: {
            title: 'Oauth2认证',
        },
        component: () => import('@/components/Oauth2')
    },
    {
        path: '/client',
        name: 'Client',
        meta: {
            title: 'Oauth2客户端',
        },
        component: () => import('@/components/Client')
    },

    {
        path: '/404',
        name: 'Page404',
        meta: {
            headerShow: true,
            title: '找不到页面'
        },
        component: () => import('@/components/Page404')
    }, {
        path: '*',
        redirect: '/404'
    }
]