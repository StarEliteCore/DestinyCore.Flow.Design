import { RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import Home from "@/views/flow-design-panel/flow-design-panel.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/home-page",
    component: () => import("@/layout/layout.vue"),
    children: [
      {
        path: '/home-page',
        name: "设计器",
        component: Home,
      }
    ]
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
