import MyLayout from '~/layouts/MyLayout';
import HeaderAsideFooterLayout from '~/layouts/HeaderAsideFooterLayout';
import EmptyLayout from '~/layouts/EmptyLayout';

import NotFound from '~/pages/NotFound';
import {DomainList,RecordList,RecordForm} from '~/pages/Ddns';
import {OrderList,OrderCreate,OrderPay} from '~/pages/Order';
import Login from '~/pages/Login';

const routerConfig = [
    {
        path: '/',
        layout: HeaderAsideFooterLayout,
        component: NotFound,
    },
    {
        path: '/app/ddns/index',
        layout: HeaderAsideFooterLayout,
        component: DomainList,
    },
    {
        path: '/ddns/record/index',
        layout: HeaderAsideFooterLayout,
        component: RecordList,
    },
    {
        path: '/ddns/record/update',
        layout: HeaderAsideFooterLayout,
        component: RecordForm,
    },
    {
        path: '/app/order/index',
        layout: HeaderAsideFooterLayout,
        component: OrderList,
    },
    {
        path: '/app/order/create',
        layout: HeaderAsideFooterLayout,
        component: OrderCreate,
    },
    {
        path: '/app/order/pay',
        layout: HeaderAsideFooterLayout,
        component: OrderPay,
    },
    {
        path: '/login',
        layout: EmptyLayout,
        component: Login,
    },
    {
        path: '*',
        layout: MyLayout,
        component: NotFound,
    },
];

export default routerConfig;