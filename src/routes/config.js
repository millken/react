import MyLayout from '~/layouts/MyLayout';
import HeaderAsideFooterLayout from '~/layouts/HeaderAsideFooterLayout';

import NotFound from '~/pages/NotFound';

const routerConfig = [
    {
        path: '/',
        layout: HeaderAsideFooterLayout,
        component: NotFound,
    },
    {
        path: '*',
        layout: MyLayout,
        component: NotFound,
    },
];

export default routerConfig;