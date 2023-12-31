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
      path: "/login",
      component: () =>
        import(/* webpackChunkName: "login" */ "@/views/login/index.vue"),
      meta: { title: "去这儿旅行", hidden: true, notNeedAuth: true }
    },
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
            title: "工作台",
            icon: "dashboard",
            affix: true
          }
        },
		{
          path: "/statistics",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/statistics/index.vue"),
          meta: {
            title: "数据统计",
            icon: "icon-statistics"
          }
        },
        {
          path: "bus",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/bus/index.vue"),
          meta: {
            title: "大巴管理",
            icon: "icon-employee"
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
            icon: "icon-employee"
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
            icon: "icon-employee"
          }
        },
        {
          path: "/hotels/add",
          component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/hotels/addHotels.vue"),
          meta: {
            title: "添加酒店",
            hidden: true
          }
        },
        {
          path: "customers",
          component: () =>
            import(/* webpackChunkName: "shopTable" */ "@/views/customers/index.vue"),
          meta: {
            title: "用户管理",
            icon: "icon-employee"
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
        }

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
