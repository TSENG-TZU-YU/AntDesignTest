import Layout from '@/views/layout/Layout';
import Home from '@/views/Home';
import User from '@/views/User';
// import Login from "@/views/login/Login";
// import NotFound from "@/views/NotFound/NotFound";
import { ReactNode } from 'react';
// import lazyLoad from "./lazyLoad";
import React from 'react';
interface RouterItem {
    path: string;
    label: string;
    hidden?: boolean;
    element?: ReactNode;
    children?: RouterItem[];
    meta?: { allow: boolean };
}
export interface AntdRouterItem extends RouterItem {
    key: string;
    type: string;
    children?: AntdRouterItem[];
}

export const router: RouterItem[] = [
    {
        path: '/',
        label: '首頁',
        element: <Layout />,
        meta: { allow: false },
    },
    {
        path: '/login',
        label: '登入頁',
        element: <Layout />,
        hidden: true,
    },

    {
        path: '/layout',
        label: '控制台',
        element: <Layout />,
        children: [
            {
                path: 'user',
                label: '使用者',
                // element: <User />,
                children: [
                    {
                        path: 'user1',
                        label: 'user111',
                        element: <Home />,
                    },
                    {
                        path: 'yyyyy',
                        label: 'yyyyyy',
                        // element: <User />,
                        children: [
                            {
                                path: 'user',
                                label: 'user111',
                                element: <User />,
                            },
                            {
                                path: 'yyyyy',
                                label: 'yyyyyy',
                                element: <Home />,
                            },
                        ],
                    },
                ],
            },
            {
                path: 'home',
                label: 'home',
                element: <Home />,
            },
        ],
    },
    {
        path: '/*',
        label: '404',
        element: <User />,
        hidden: true,
    },
];
export default router;
export const router_item = convertRouter(router);
function convertRouter(
    config: RouterItem[],
    parentKey = '',
    parentHidden = false,
    parentMeta = { allow: true }
): AntdRouterItem[] {
    return config.map((item: RouterItem) => {
        const key = parentKey ? `${parentKey}/${item.path}` : item.path;
        const newItem: AntdRouterItem = {
            ...item,
            key,
            type: '',
            hidden: getHidden(item, parentHidden),
            meta: item.meta ? item.meta : parentMeta,
        } as AntdRouterItem;
        if (newItem.children) {
            newItem.children = convertRouter(newItem.children, key, newItem.hidden, newItem.meta);
        }
        return newItem;
    });
}

function getHidden(item: RouterItem, parentHidden: boolean): boolean {
    if (typeof item.hidden === 'boolean') {
        return item.hidden;
    }
    return parentHidden;
}
