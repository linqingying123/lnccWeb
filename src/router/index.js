// 定义vue路由

import {createRouter, createWebHistory} from "vue-router";

import Index from '@/views/index'

import Home from '@/components/Home'


const routes = [
    {path: "/", redirect: "/index"},
    {
        path: '/index',
        name: 'Index',
        component: Index,
        children: [
            // {
            //     path: '/index', redirect: '/home'
            // },
            {
                path: '/home',
                name: 'Home',
                component: Home,
                props: true
            },
            {
                path: '/nav',
                name: 'NavContent',
                component: () => import('@/components/NavContent'),

            },
            {
                path: '/contentList/:type',
                name: 'ContentList',
                component: () => import('@/components/ContentList'),
            },
            {
                path: '/detail/:type/:id',
                name: 'contentDetail',
                component: () => import('@/components/contentDetail'),
            },
            {
                path: '/search',
                name: 'Search',
                component: () => import('@/components/Search'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

