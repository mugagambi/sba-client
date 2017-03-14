import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: require('../views/Home')
    },
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      name: 'Register',
      path: '/register',
      component: require('../views/auth/register/Register')
    },
    {
      name: 'Log in',
      path: '/login',
      component: require('../views/auth/login/Login')
    },
    {
      name: 'My Profile',
      path: '/profile/:username',
      component: require('../views/profile/Profile')
    },
    {
      name: 'Add a New Category',
      path: '/categories/add',
      component: require('../views/categories/save-category')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
    if (!item.component) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}
