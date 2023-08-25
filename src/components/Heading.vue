<script setup>
defineProps({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  variants: {
    type: String
  }
})
</script>

<template>
  <div :class="variants" class="mt-3 mb-2">
    <h1 class="text-2xl capitalize font-extrabold leading-none tracking-tight text-white md:text-4xl">
      {{ title }}</h1>
    <p class="text-lg font-normal text-gray-500 lg:text-xl">{{ subtitle }} </p>
  </div>
</template>