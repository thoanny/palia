<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="max-w-2xl mx-auto my-6">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <div class="max-w-2xl mx-auto my-6">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
nav {
  @apply flex gap-2;
}

nav>a {
  @apply btn;
}

nav a.router-link-active {
  @apply btn-primary;
}
</style>
