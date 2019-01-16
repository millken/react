export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'home' },
        {
            key: '/app/ddns', title: '动态DNS', icon: 'database',
            subs: [
                { key: '/app/ddns/index', title: '域名管理'},
                { key: '/app/ddns/client', title: 'DDNS客户端' },
            ],
        },
        { key: '/app/dashboard/ddns', title: '动态DNS', icon: 'database', component: 'Dashboard' },
        { key: '/app/dashboard/waf', title: 'CDN+', icon: 'cluster', component: 'Dashboard' },
        { key: '/app/order/index', title: '订单管理', icon: 'ordered-list'},
        {
            key: '/app/ui', title: '产品', icon: 'project',
            subs: [
                { key: '/product/list', title: '产品列表', component: 'Buttons' },
            ],
        },
        {
            key: '/app/table', title: '表格', icon: 'copy',
            subs: [
                { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable' },
                { key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable' },
                { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable' },
            ],
        },
        {
            key: '/app/form', title: '表单', icon: 'edit',
            subs: [
                { key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm' },
            ],
        },
        {
            key: '/app/chart', title: '图表', icon: 'area-chart',
            subs: [
                { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
                { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
            ],
        },
        {
            key: '/subs4', title: '页面', icon: 'switcher',
            subs: [
                { key: '/login', title: '登录' },
                { key: '/404', title: '404' },
            ],
        },
        {
            key: '/app/auth', title: '权限管理', icon: 'safety',
            subs: [
                { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
                { key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
            ],
        },
        {
            key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule',
        },
        {
            key: '/app/extension', title: '功能扩展', icon: 'bars',
            subs: [
                { key: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2' },
            ],
        },
    ],
    others: [], // 非菜单相关路由
};