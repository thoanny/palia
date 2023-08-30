<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="max-w-2xl mx-auto py-6">
      <div class="flex gap-4 justify-between items-center wb-6">
        <img src="@/assets/logo-1.png" class="invert w-24" alt="">
        <nav>
          <RouterLink to="/">Personnages</RouterLink>
          <button class="btn btn-sm btn-secondary" disabled>Objets</button>
          <button class="btn btn-sm btn-secondary" disabled>Recettes</button>
          <RouterLink to="/about">À propos</RouterLink>
        </nav>
      </div>

    </div>
  </header>
  <main>
    <div class="max-w-2xl mx-auto pb-6">
      <RouterView />
    </div>
  </main>
  <footer>
    <div class="max-w-2xl mx-auto py-6 text-sm text-center opacity-50">
      Tous les logos, marques et images de ce site sont la propriété de Singularity 6 Corporation.<br />
      Ce site n'est pas affilié avec l'éditeur.<br />
      Réalisé par <a href="https://thoanny.fr" target="_blank" class="underline">Thoanny</a>
    </div>
  </footer>
</template>

<style scoped>
nav {
  @apply flex gap-2;
}

nav>a {
  @apply btn btn-sm btn-secondary;
}

nav a.router-link-active {
  @apply btn-accent;
}
</style>
