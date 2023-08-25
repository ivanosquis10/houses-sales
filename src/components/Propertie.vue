<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  properties: {
    type: Object
  },
  price: {
    type: Function
  }

})
</script>

<template>
  <div class="group relative block overflow-hidden border border-zinc-800 shadow-xl">
    <button class="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
      <span class="sr-only">Wishlist</span>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="h-4 w-4">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </button>

    <img :src="properties?.image" alt=""
      class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72" />

    <div class="relative bg-neutral-900 p-6 text-white flex flex-col justify-between">

      <div class="flex items-center gap-x-2">
        <span
          class="w-fit capitalize whitespace-nowrap shadow border border-zinc-800 px-3 py-1.5 text-xs font-medium rounded">
          new
        </span>
        <span :class="[properties?.pool ? 'opacity-100' : 'opacity-0']"
          class="w-fit capitalize whitespace-nowrap shadow border border-zinc-800 px-3 py-1.5 text-xs font-medium rounded">
          pool
        </span>


      </div>

      <h3 class="mt-2 text-lg font-medium">{{ properties?.title }}</h3>

      <p class="mt-2 text-base tracking-wider">{{ price(properties?.price) }}</p>

      <RouterLink :to="{ name: 'propertie', params: { id: properties?.id } }"
        class="mt-4 text-center block w-full rounded bg-zinc-800 px-8 py-4 text-sm capitalize font-medium text-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-white">
        see propertie
      </RouterLink>
    </div>

  </div>
</template>