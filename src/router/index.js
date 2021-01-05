import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    
    component: () => import(/* webpackChunkName: "calendar" */ '../views/calendar/Index.vue')
  },
  {
    path: '/category',
    name: 'Category',
    
    component: () => import(/* webpackChunkName: "category" */ '../views/category/Index.vue')
  },
  {
    path: '/championship',
    name: 'Championship',
    
    component: () => import(/* webpackChunkName: "championship" */ '../views/championship/Index.vue')
  },
  {
    path: '/crew',
    name: 'Crew',
    
    component: () => import(/* webpackChunkName: "crew" */ '../views/crew/Index.vue')
  },
  {
    path: '/penalty',
    name: 'Penalty',
    
    component: () => import(/* webpackChunkName: "penalty" */ '../views/penalty/Index.vue')
  },
  {
    path: '/report',
    name: 'Report',
    
    component: () => import(/* webpackChunkName: "report" */ '../views/report/Index.vue')
  },
  {
    path: '/stage',
    name: 'Stage',
    
    component: () => import(/* webpackChunkName: "stage" */ '../views/stage/Index.vue')
  },
  {
    path: '/time',
    name: 'Time',
    
    component: () => import(/* webpackChunkName: "time" */ '../views/time/Index.vue')
  },
  {
    path: '/live',
    name: 'Live',
    
    component: () => import(/* webpackChunkName: "live" */ '../views/live/Index.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
