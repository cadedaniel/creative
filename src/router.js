import CurrentStreamers from './views/CurrentStreamers.vue'
import Leaderboard from './views/Leaderboard.vue'
import Login from './views/Login.vue'
import PopularVideos from './views/PopularVideos.vue'
import Register from './views/Register.vue'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/current_streamers',
      name: 'current_streamers',
      component: CurrentStreamers
    },
    {
      path: '/popular_videos',
      name: 'popular_videos',
      component: PopularVideos
    },
  ]
});
