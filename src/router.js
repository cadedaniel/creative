import Home from './views/Home.vue'
import PhotoTheater from './views/PhotoTheater.vue'
import Login from './views/Login.vue'
import MyPage from './views/MyPage.vue'
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
      name: 'home',
      component: Home
    },
    {
	path: '/mypage',
	name: 'mypage',
	component: MyPage,
    },
    {
	path: '/register',
	name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/phototheater',
        name: 'phototheater',
        component: PhotoTheater
    }
  ]
});
