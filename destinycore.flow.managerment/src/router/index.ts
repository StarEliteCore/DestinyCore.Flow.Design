import { RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import Home from "@/views/flow-design-panel/flow-design-panel.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
