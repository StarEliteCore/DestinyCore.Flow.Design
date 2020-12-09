import VueRouter, { RouteConfig } from 'vue-router'

import Home from "@/views/flow-design-panel/flow-design-panel.vue";
import Vue from 'vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: "/home-page",
    component: () => import("@/layout/layout.vue"),
    children: [
      {
        path: '/home-page',
        name: "设计器",
        component: Home,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
