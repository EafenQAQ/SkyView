import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/weather/:city/:state/:country',
      name: 'cityView',
      component: CityView,
      meta: {
        title: "当地天气"
      }
    },

  ],
})

router.beforeEach((to, from, next) => {
  document.title = `${to.params.state ? `${to.params.city} ${to.params.state}` : to.meta.title } | SkyView`;
  next();
})

export default router
