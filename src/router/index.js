import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from "../views/dashboard/DashboardView.vue";
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from "../views/dashboard/MyAccountView.vue";
import ProjectManagementCrudeView from "../views/project_mgmt/PmCrudeView.vue"  


import ProjectManagemenMainView from "../views/project_mgmt/MainView.vue";

import store from '../store'

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/log-in",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiredLogin: true,
    },
  },
  {
    path: "/dashboard/my-account",
    name: "MyAccount",
    component: MyAccount,
    meta: {
      requiredLogin: true,
    },
  },

  {
    path: "/project_mgmt",
    name: "ProjectManagemenMainView",
    component: ProjectManagemenMainView,
    meta: {
      requiredLogin: true,
    },
  },
  {
    path: "/project_mgmt/crude",
    name: "ProjectManagementCrudeView",
    component: ProjectManagementCrudeView,
    meta: {
      requiredLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiredLogin && !store.state.isAuthenticated)) {
    next('/log-in')
  } else {
    next()
  }
})

export default router
