import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()
  const router = useRouter()

  const authUser = ref(null)
  const errorMessage = ref('')
  const loading = ref(false)

  // diccionario de posibles errores
  const errorCodes = {
    'auth/user-not-found': 'user not found',
    'auth/wrong-password': 'wrong password'
  }

  onMounted(() => {
    loading.value = true
    onAuthStateChanged(auth, (user) => {
      if (user) {
        loading.value = false
        authUser.value = user
      }
    })
  })


  function login({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        authUser.value = user
        router.push({ name: 'admin-properties' })
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code]
      })
      .finally(() => {
        setTimeout(() => {
          errorMessage.value = ''
        }, 3000)
      })
  }

  async function logOut() {
    try {
      await signOut(auth)
      authUser.value = null
      router.push({ name: 'login' })
    } catch (err) {
      console.log(err)
    }
  }

  const isError = computed(() => errorMessage.value)

  const isAuth = computed(() => authUser.value)


  return {
    // prinicipals functions
    login,
    logOut,

    // properties
    errorMessage,
    authUser,
    loading,

    // computed
    isError,
    isAuth
  }
}) 