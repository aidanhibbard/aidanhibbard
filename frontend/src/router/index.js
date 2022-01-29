import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: function () {
      return import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
    },
  },
  {
    path: '/blog/post/:name',
    name: 'Post',
    component: function () {
      return import(/* webpackChunkName: "post" */ '../views/nested/Post.vue')
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: function () {
      return import(/* webpackChunkName: "projects" */ '../views/Projects.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
