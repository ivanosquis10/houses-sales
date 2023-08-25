<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores'

import { Notification } from '../components'
import { AtSymbolIcon, EyeIcon } from '@heroicons/vue/24/outline'

const auth = useAuthStore()

const inputsFields = ref({
  email: '',
  password: ''
})

const submit = () => {
  if ([inputsFields.value.email, inputsFields.value.password].includes('')) {
    return alert('todos los campos son obligatorios')
  }

  auth.login(inputsFields.value)
}


</script>

<template>
  <div class="mx-auto container px-4 py-16 sm:px-6 lg:px-8 relative">
    <Notification v-if="auth.isError" :msg="auth.errorMessage" type="error" />
    <div class="mx-auto max-w-lg">
      <h1 class="text-center text-2xl font-bold sm:text-3xl">
        Welcome, get started today
      </h1>

      <p class="mx-auto mt-4 max-w-md text-center text-gray-400">
        Log in, publish your home or search for the best options for your new happy home.
      </p>

      <form @submit.prevent="submit" class="mb-0 mt-6 space-y-5 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <p class="text-center text-lg font-medium">Sign in to your account</p>

        <div class="relative">
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <input type="email" class="bg-zinc-800 border w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email" v-model="inputsFields.email" autocomplete="off" />

            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <AtSymbolIcon class="w-5 h-5 text-zinc-400" />
            </span>
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>

          <div class="relative">
            <input type="password" class="bg-zinc-800 w-full rounded-lg border p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password" v-model="inputsFields.password" autocomplete="none" />
            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <EyeIcon class="w-5 h-5 text-zinc-400" />
            </span>
          </div>
        </div>

        <button type="submit"
          class="block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-medium text-white custom-animation">
          Sign in
        </button>

        <p class="text-center text-sm text-gray-500">
          No account?
          <a class="underline text-white" href="">Sign up</a>
        </p>
      </form>
    </div>
  </div>
</template>