<script setup>
import { useProperties } from '../composables'
import { Hero, Propertie, Heading } from '../components'

const { propertiesCollection, formatPrice } = useProperties()
</script>

<template>
  <Hero />
  <Heading title="Come in and take a look" subtitle="take a look at the properties and take the one you like the most!"
    variants="text-center mt-10" />
  <section class="container mx-auto grid gap-4 my-8 px-5 sm:grid-cols-2 lg:grid-cols-4">
    <Propertie v-for="properties in propertiesCollection" :key="properties.id" :properties="properties" :price="formatPrice" />
  </section>
</template>
