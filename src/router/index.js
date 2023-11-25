import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoView from '../views/TodoView.vue'
import goTo from 'vuetify/lib/services/goto'

import ListCompletedTasks from '../components/Todo/ListCompletedTasks'
import LoginView from '../views/LoginView'
import AlboView from '../views/AlboView'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'List',
    component: TodoView
  },
  {
    path: '/completed',
    name: 'Completed',
    component: ListCompletedTasks
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/albo',
    name: 'Albo',
    component: AlboView
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, _, next) => { // to, from, next
  document.title = `TO-DO APP | ${to.name}`
  next()
})

router.afterEach(() => { // to, from
  goTo(0, { duration: 0 })
})

export default router
