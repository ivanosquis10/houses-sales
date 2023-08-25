<script setup>
import { RouterLink } from 'vue-router'
// import { useAuthStore } from '@/stores'
import { Heading } from '@/components'
import { useProperties } from '@/composables'
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'


// const auth = useAuthStore()
const { propertiesCollection, formatPrice } = useProperties()

</script>

<template>
  <section class="container mx-auto">
    <header class="flex items-center justify-between">
      <Heading title="admin panel" subtitle="Here you can manage your properties" />

      <RouterLink :to="{ name: 'new-propertie' }"
        class="group relative flex items-center overflow-hidden rounded bg-zinc-800 shadow-lg px-8 py-3 text-white focus:outline-none focus:ring focus:ring-white"
        href="/download">
        <span class="absolute -end-full transition-all group-hover:end-4">
          <svg class="h-6 w-7 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>

        <span class="text-base capitalize font-medium transition-all group-hover:me-4">
          new propetie
        </span>
      </RouterLink>
    </header>

    <div class="my-10 p-2 container mx-auto">
      <ul class="flex flex-col gap-5">
        <li v-for="propertie in propertiesCollection" :key="propertie.id"
          class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-4">
          <div class="rounded shadow-xl">
            <img width="100" height="100" :src="propertie.image"
              class="object-center rounded w-full lg:h-32 aspect-video object-cover" alt="preview of the image" />
          </div>
          <div class="rounded bg-zinc-800 shadow-xl lg:col-span-2 p-2 flex flex-col justify-between">
            <div>
              <h3 class="text-lg md:text-xl font-bold">
                {{ propertie.title }}
              </h3>
              <p class="text-zinc-400">
                {{ propertie.description }}
              </p>
            </div>
            <p class="font-bold tracking-wide text-lg">
              {{ formatPrice(propertie.price) }}
            </p>
          </div>
          <div class="rounded bg-zinc-800 overflow-hidden shadow-sm flex justify-between">
            <RouterLink :to="{
              name: 'edit-propertie', params: {
                id: propertie.id
              }
            }"
              class="w-full px-4 py-2 text-sm font-medium hover:bg-black/25 focus:relative transition-all duration-300 ease-in-out flex items-center justify-center gap-2 border-r border-zinc-700 hover:text-indigo-600">
              <PencilSquareIcon class="w-5 h-50" />
              Edit
            </RouterLink>

            <button
              class="w-full px-4 py-2 text-sm font-medium hover:bg-black/25 focus:relative transition-all duration-300 ease-in-out flex items-center justify-center gap-2 hover:text-red-600">
              <TrashIcon class="w-5 h-50" />
              Delete
            </button>
          </div>
        </li>

      </ul>
    </div>

  </section>
</template>