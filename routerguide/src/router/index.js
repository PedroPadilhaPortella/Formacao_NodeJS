import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Usuario from '../views/Usuario.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
      // path: '/usuario/:nome',
      path: '/usuario/',
    name: 'Usuario',
    component: Usuario,
    children: [
        {
            path: 'padrao',
            name: 'Padrao',
            component: About
        }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
