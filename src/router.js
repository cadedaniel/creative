import Leaderboard from './views/Leaderboard.vue'
import Login from './views/Login.vue'
import CurrentStreamers from './views/CurrentStreamers.vue'
import PopularVideos from './views/PopularVideos.vue'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
