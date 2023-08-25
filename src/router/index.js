import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/admin/properties',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue'),
        },
        {
          path: '/admin/new',
          name: 'new-propertie',
          component: () => import('../views/admin/AdminNewPropertie.vue'),
        },
        {
          path: '/admin/edit/:id',
          name: 'edit-propertie',
          component: () => import('../views/admin/AdminEditPropertie.vue'),
        }
      ]
    },
    {
      path: '/propertie/:id',
      name: 'propertie',
      component: () => import('../views/propertie/PropertieView.vue')
    },
  ]
})

// Guard de navegacion - esto sera un codigo que se va a ejecuar antes de llegar a la vista 
router.beforeEach(async (to, from, next) => {
  // Vamos a validar que las rutas tenga el campo de "requiredAuth" y en caso de que sea asi, validamos si hay un usuario autenticado / caso contrario, mandamos al login
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    try {
      // validamos la autenticacion del usuario
      await autheticateUser()
    } catch (error) {
      // en caso de que falle el auth, enviamos al login
      console.log(error)
      return next({ name: 'login' })
    }
  }
  // no esta protegido por el auth, so mostramos
  next()
})

function autheticateUser() {

  const auth = useFirebaseAuth()
  return new Promise((resolve, reject) => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {

      unsuscribe() // esta function tiene un observer, ya al realizar la accion no es necesario seguir viendo lso cambios, por ende, no desuscribimos.
      if (user) {
        return resolve()
      }
      return reject()
    })
  })
}

export default router
