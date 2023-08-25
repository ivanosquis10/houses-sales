<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFireStores } from '../../stores'

const route = useRoute()
const store = useFireStores()

const propertie = ref({})

onMounted(() => {
  store.loading = true
  store.getDocument(route.params.id).then((res) => {
    propertie.value = res.value
  }).catch((err) => console.log(err))
})
</script>

<template>
  <section class="container mx-auto">
    <div v-if="!store.loading" class="h-screen bg-white">cargando</div>
    <div v-else class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-3 lg:px-0 lg:py-16 lg:grid-cols-12">
      <div class="lg:mt-0 lg:col-span-5 lg:flex">
        <img :src="propertie?.image" alt="mockup" class="rounded object-cover object-center">
      </div>
      <div class="lg:col-span-7 rounded shadow-lg px-2 py-3 border border-zinc-800">
        <div class="h-full">
          <ul class="-my-3 divide-y text-sm divide-zinc-700">
            <li class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4 items-center">
              <p class="font-medium text-white text-lg capitalize">Title</p>
              <p class="text-gray-200 sm:col-span-2 text-lg font-bold">{{ propertie?.title }}</p>
            </li>
            <li class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4 items-center">
              <p class="font-medium text-white text-lg capitalize">price</p>
              <p class="text-gray-200 sm:col-span-2 text-lg font-bold">{{ propertie?.price }}</p>
            </li>
            <li class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4 items-center">
              <p class="font-medium text-white text-lg">Title</p>
              <p class="text-gray-200 sm:col-span-2 text-lg font-bold">{{ propertie?.title }}</p>
            </li>
            <li class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4 items-center">
              <p class="font-medium text-white text-lg capitalize">description</p>
              <p class="text-gray-200 sm:col-span-2 text-lg font-bold">{{ propertie?.description }}</p>
            </li>


          </ul>
        </div>
      </div>
    </div>


  </section>
</template>