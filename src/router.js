import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Todays Racing',
      component: () => import(/* webpackChunkName: "about" */ './views/Today.vue')
    },
    {
      path: '/Meeting/:course',
      name: 'Meetings',
      component: () => import(/* webpackChunkName: "about" */ './views/Event.1.vue')
    },
    {
      path: '/Races/:course',
      name: 'Races',
      component: () => import(/* webpackChunkName: "about" */ './views/Races.vue')
    },
    {
      path: '/Meeting',
      name: 'meeting',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Meeting.vue')
    },
    {
      path: '/race/:UID',
      name: 'Race',
      component: () => import('./views/Race.vue')
    },
    {
      path: '/chat/',
      name: 'Chat',
      component: () => import('./views/chat.vue')
    },
    {
      path: '/Placepot/:UID',
      name: 'Placepot',
      component: () => import('./views/PlacePot.vue')
    }
    ,
    {
      path: '/architecturetimeline',
      name: 'Timeline',
      component: () => import('./views/ArchitectureTimeline.vue')
    }
  ]
})

