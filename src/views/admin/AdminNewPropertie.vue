<script setup>
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"
import "leaflet/dist/leaflet.css"

import { addProperties } from '@/firebase/firebaseFuntions/firestore'
import { validationSchema, imageSchema } from '@/validation'
import { useImage, useLocationMap } from '@/composables'
import { Heading } from '@/components'
import { CurrencyDollarIcon, HomeModernIcon, PhotoIcon } from '@heroicons/vue/24/outline'

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema
  }
})

const router = useRouter()
const { uploadImage, imagePreview, url } = useImage()
const { zoom, center, getMarkerLocation } = useLocationMap()

const numbers = [1, 2, 3, 4, 5]

const title = useField('title')
const price = useField('price')
const bedrooms = useField('bedrooms')
const bathrooms = useField('bathrooms')
const parking = useField('parking')
const description = useField('description')
const image = useField('image')
const pool = useField('pool', null, {
  initialValue: false
})

const getfile = (e) => {
  image.value.value = e.target.files[0].name
  const fullData = e.target.files[0]
  return uploadImage(fullData)
}


const submit = handleSubmit(async (values) => {
  const { image, ...properties } = values
  await addProperties({
    properties,
    image: url.value,
    location: center.value
  })
  resetForm()
  return router.push({ name: 'admin-properties' })
})
</script>

<template>
  <Heading title="add a house" subtitle="Fill the form and sell your property!" variants="container mx-auto" />
  <section class="pb-5 container mx-auto">
    <form @submit="submit" class="mb-0 mt-6 space-y-5 rounded-lg p-4 shadow-lg sm:p-4 max-w-screen-lg mx-auto">

      <div class="relative grid grid-cols-6 gap-x-6 gap-y-10 border-b border-zinc-800 pb-2">

        <div class="col-span-3 relative">
          <label for="title" class="text-gray-400 font-bold tracking-wide capitalize">title</label>
          <div class="relative">
            <input id="title" type="text" class="bg-zinc-800 rounded w-full p-4 pe-12 text-base shadow-sm outline-none"
              v-model="title.value.value" placeholder="Title for your property" autocomplete="off" />
            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <HomeModernIcon class="w-5 h-5 text-zinc-300" />
            </span>
          </div>
          <span v-if="errors.title" class="absolute px-1 rounded text-red-500">{{
            errors.title }}</span>
        </div>

        <div class="col-span-3">
          <label for="price" class="text-gray-400 font-bold tracking-wide capitalize">price</label>
          <div class="relative">
            <input id="price" type="text" class="bg-zinc-800 rounded w-full p-4 pe-12 text-base shadow-sm outline-none"
              v-model="price.value.value" placeholder="Price, ex: $30,000" autocomplete="off" />
            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <CurrencyDollarIcon class="w-5 h-5 text-zinc-300" />
            </span>
          </div>
          <span v-if="errors.price" class="absolute px-1 rounded text-red-500">{{
            errors.price }}</span>

        </div>

        <div class="col-span-6">
          <label for="image" class="text-gray-400 font-bold tracking-wide capitalize">Propertie image</label>
          <div class="relative">
            <input id="image" type="file" class="bg-zinc-800 rounded w-full p-4 pe-12 text-base shadow-sm outline-none"
              @change="getfile" />
            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
              <PhotoIcon class="w-5 h-5 text-zinc-400" />
            </span>
          </div>
          <div v-if="imagePreview" class="w-full flex flex-col mt-2 gap-x-2">
            <span class="font-bold">Image preview:</span>
            <img :src="imagePreview" class="w-80 h-52 rounded" alt="preview of the image" />
          </div>
          <span v-if="errors.image" class="absolute px-1 rounded text-red-500">{{
            errors.image }}</span>
        </div>

        <div class="col-span-2">
          <label for="bedrooms" class="text-gray-400 font-bold tracking-wide capitalize">bedrooms</label>
          <div class="relative">
            <select id="bedrooms"
              class="bg-zinc-800 active:border rounded w-full p-4 pe-12 text-base shadow-sm outline-none"
              placeholder="title for your property" autocomplete="off" v-model="bedrooms.value.value">
              <option selected value="">-- bedroom --</option>
              <option v-for="options in numbers" :value="options">{{ options }}</option>
            </select>
          </div>
          <span v-if="errors.bedrooms" class="absolute px-1 rounded text-red-500">{{
            errors.bedrooms }}</span>
        </div>

        <div class="col-span-2">
          <label for="bathrooms" class="text-gray-400 font-bold tracking-wide capitalize">bathrooms</label>
          <div class="relative">
            <select id="bathrooms" class="bg-zinc-800 rounded w-full p-4 pe-12 text-base shadow-sm outline-none"
              placeholder="title for your property" autocomplete="off" v-model="bathrooms.value.value">
              <option selected value="">-- bathroom --</option>
              <option v-for="options in numbers" :value="options">{{ options }}</option>
            </select>
          </div>
          <span v-if="errors.bathrooms" class="absolute px-1 rounded text-red-500">{{
            errors.bathrooms }}</span>
        </div>

        <div class="col-span-2">
          <label for="parking" class="text-gray-400 font-bold tracking-wide capitalize">parking spot</label>
          <div class="relative">
            <select id="parking" class="bg-zinc-800 rounded text-white w-full p-4 pe-12 text-base shadow-sm outline-none"
              v-model="parking.value.value" autocomplete="off">
              <option selected value="">-- parking --</option>
              <option v-for="options in numbers" :value="options">{{ options }}</option>
            </select>
          </div>
          <span v-if="errors.parking" class="absolute px-1 rounded text-red-500">{{
            errors.parking }}</span>
        </div>

        <div class="col-span-1">
          <label for="pool" class="text-gray-400 font-bold tracking-wide capitalize">pool</label>
          <div class=" bg-zinc-800 text-base shadow-sm outline-none w-full p-4 rounded">
            <input type="checkbox"
              class="relative w-5 h-5 cursor-pointer appearance-none rounded border-2 border-blue-gray-200  checked:bg-indigo-500 hover:opacity-90"
              v-model="pool.value.value" id="pool" />
          </div>
        </div>


        <div class="col-span-5">
          <label for="description" class="text-gray-400 font-bold tracking-wide capitalize">description</label>
          <div class="relative">
            <input id="description" type="text" v-model="description.value.value"
              class="bg-zinc-800 rounded w-full p-4 pe-12 text-base shadow-sm outline-none"
              placeholder="please write a description of your property..." />
          </div>
          <span v-if="errors.description" class="px-1 rounded text-red-500">{{
            errors.description }}</span>
        </div>

        <div class="col-span-6 h-[400px] rounded">
          <LMap ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" @moveend="getMarkerLocation" draggable />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
            </LTileLayer>
          </LMap>
        </div>


      </div>

      <button type="submit"
        class="group relative inline-flex items-center overflow-hidden rounded bg-zinc-800 shadow-lg px-8 py-3 text-white focus:outline-none focus:ring focus:ring-white">
        <span class="absolute -end-full transition-all group-hover:end-4">
          <svg class="h-6 w-7 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
        <span class="text-base capitalize font-medium transition-all group-hover:me-4">
          add propertie
        </span>
      </button>


    </form>
  </section>
</template>