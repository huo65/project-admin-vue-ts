import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(Router);

const router = new Router({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/404",
      component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
      meta: { title: "去这儿旅行", hidden: true, notNeedAuth: true }
    },
    {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"),
          name: "Dashboard",
          meta: {
            title: "管理端",
            icon: "dashboard",
            affix: true
          }
        },
        {
          path: "bus",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/bus/index.vue"),
          meta: {
            title: "大巴管理",
            icon: ""
          }
        },
        {
          path: "/bus/add",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/bus/addBus.vue"),
          meta: {
            title: "添加公交",
            hidden: true
          }
        },
        {
          path: "flights",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/flights/index.vue"),
          meta: {
            title: "航班管理",
            icon: ""
          }
        },
        {
          path: "/flights/add",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/flights/addFlights.vue"),
          meta: {
            title: "添加航班",
            hidden: true
          }
        },
        {
          path: "hotels",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/hotels/index.vue"),
          meta: {
            title: "酒店管理",
            icon: ""
          }
        },
        {
          path: "/hotels/add",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/hotels/addHotels.vue"),
          meta: {
            title: "",
            hidden: true
          }
        },
        {
          path: "customers",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/customers/index.vue"),
          meta: {
            title: "用户管理",
            icon: ""
          }
        },
        {
          path: "/customers/add",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/customers/addCustomers.vue"),
          meta: {
            title: "添加用户",
            hidden: true
          }
        },
        // 用户端
        {
          path: "user",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/user/index.vue"),
          name: "user",
          meta: {
            title: "用户端",
            icon: "icon-employee",
            affix: true
          }
        },

      ]
    },
    {
      path: "*",
      redirect: "/404",
      meta: { hidden: true }
    }
  ]
});

export default router;
