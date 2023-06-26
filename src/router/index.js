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
  ]
}

const router = createRouter(routerOptions)

export default router
