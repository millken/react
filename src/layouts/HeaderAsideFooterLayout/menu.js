export default {
    menus: [ // 菜单相关路由
        { key: '/dashboard/index', title: '首页', icon: 'home' },
        {
            key: '/ddns', title: '动态DNS', icon: 'database',
            subs: [
                { key: '/ddns/index', title: '域名管理'},
                { key: '/ddns/client', title: 'DDNS客户端' },
            ],
        },
        { key: '/app/dashboard/ddns', title: '动态DNS', icon: 'database', component: 'Dashboard' },
        { key: '/app/dashboard/waf', title: 'CDN+', icon: 'cluster', component: 'Dashboard' },
        { key: '/order/index', title: '订单管理', icon: 'ordered-list'},
        {
            key: '/app/ui', title: '产品', icon: 'project',
            subs: [
                { key: '/product/list', title: '产品列表', component: 'Buttons' },
            ],
        },
    ],
    others: [], // 非菜单相关路由
};