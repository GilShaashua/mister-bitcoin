import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactsIndex from '../views/ContactsIndex.vue'
import ContactDetails from '@/views/ContactDetails.vue'
import ContactEdit from '@/views/ContactEdit.vue'
import Signup from '@/views/Signup.vue'
import Statistics from '@/views/Statistics.vue'

const routerOptions = {
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contacts',
      name: 'contacts-index',
      component: ContactsIndex
    },
    {
      path: '/contacts/:contactId',
      name: 'contact-details',
      component: ContactDetails
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics
    },
    {
      path: '/contacts/edit/:id?',
      name: 'edit',
      component: ContactEdit,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    }
  ]
}

const router = createRouter(routerOptions)

export default router
