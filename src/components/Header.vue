<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores'
import { HomeIcon } from '@heroicons/vue/24/solid'

defineProps({
  variants: {
    type: String
  }
})

const auth = useAuthStore()
</script>

<template>
  <header class="relative w-full">

    <nav :class="variants">
      <div class="container px-2 md:px-0 flex flex-wrap items-center justify-between mx-auto py-4">
        <RouterLink :to="{ name: 'home' }" class="flex items-center text-3xl py-1.5 font-medium capitalize">
          <HomeIcon class="w-7 h-7" />
          <p>happy</p>
          <span class="font-extrabold text-indigo-400">homes</span>
        </RouterLink>
        <button data-collapse-toggle="navbar-default" type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>


        <!-- nav links -->
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">

          <ul v-if="!auth.isAuth"
            class="font-medium text-xl flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">

            <li class="capitalize border-0 hover:border-b custom-animation">
              <RouterLink :to="{ name: 'home' }" class="block py-2 rounded md:bg-transparent md:p-0 text-white"
                aria-current="page">
                home
              </RouterLink>
            </li>

            <li class="capitalize border-0 hover:border-b custom-animation">
              <RouterLink :to="{ name: 'login' }" class="block py-2 rounded md:bg-transparent md:p-0 text-white"
                aria-current="page">
                login
              </RouterLink>
            </li>

          </ul>


          <ul v-else class="font-medium text-xl flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">

            <li class="capitalize border-0 hover:border-b custom-animation">
              <RouterLink :to="{ name: 'admin-properties' }"
                class="block py-2 rounded md:bg-transparent md:p-0 text-base text-white" aria-current="page">
                admin
              </RouterLink>
            </li>

            <li class="capitalize border-0 hover:border-b custom-animation">
              <button class="capitalize block py-2 text-base rounded md:bg-transparent md:p-0 text-white"
                @click="auth.logOut" aria-current="page">
                sign out
              </button>
            </li>

          </ul>



        </div>
      </div>
    </nav>


  </header>
</template>