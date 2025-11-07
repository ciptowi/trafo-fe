import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "./utils/auth-storage";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./pages/HomePage.vue"),
  },
  {
    path: "/trafo",
    name: "trafo",
    component: () => import("./pages/TrafoPage.vue"),
  },
  {
    path: "/trafo-group",
    name: "trafo group",
    component: () => import("./pages/TrafoGroupPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || "/"),
  routes,
});

router.beforeEach((to, _, next) => {
  const token = getAuth();
  // kalau butuh login dan token tidak ada → ke login
  if (!token) {
    if (to.name !== "login") {
      next({ name: "login" });
    } else {
      next();
    }
  }
  // kalau buka login tapi sudah login → ke dashboard
  else if (to.name === "login" && token) {
    next({ name: "trafo" });
  }
  // selain itu lanjut aja
  else {
    next();
  }
});
