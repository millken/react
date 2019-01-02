import MyLayout from '~/layouts/MyLayout';
import HeaderAsideFooterLayout from '~/layouts/HeaderAsideFooterLayout';
import EmptyLayout from '~/layouts/EmptyLayout';

import NotFound from '~/pages/NotFound';
import {ProductList,ProductForm} from '~/pages/Product';
import Login from '~/pages/Login';

const routerConfig = [
    {
        path: '/',
        layout: HeaderAsideFooterLayout,
        component: NotFound,
    },
    {
        path: '/product/list',
        layout: HeaderAsideFooterLayout,
        component: ProductList,
    },
    {
        path: '/product/add',
        layout: HeaderAsideFooterLayout,
        component: ProductForm,
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