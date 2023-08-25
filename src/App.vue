<script setup>
import { RouterView } from 'vue-router'
import { Header } from './components'

</script>

<template>
  <Header />
  <main class="relative">
    <RouterView />
  </main>
</template>
