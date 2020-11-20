import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./../views/Home')
  },
  {
    path: '/tagcanvas',
    name: 'TagCanvas',
    component: () => import('../views/TagCanvas')
  },
  {
    path: '/css3-transform',
    name: 'CSS3-Transform',
    component: () => import('../views/CSS3-Transform')
  }
]

const router = new VueRouter({
  routes
})

export default router
