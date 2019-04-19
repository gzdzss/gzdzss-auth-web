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
    }, {
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