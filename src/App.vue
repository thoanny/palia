<script setup>
import { RouterLink, RouterView } from 'vue-router';
import ServerClock from '@/components/ServerClock.vue';
</script>

<template>
  <header>
    <div class="max-w-2xl mx-auto py-8 px-4 relative">
      <div class="navbar bg-base-100 rounded-full border border-primary justify-between shadow-lg shadow-secondary/25">
        <div class="">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabindex="0"
              class="menu menu-sm dropdown-content mt-3 z-[1] p-2 border border-primary shadow-lg shadow-secondary/25 bg-base-100 rounded-box w-52">
              <li>
                <RouterLink :to="{ name: 'Characters' }">Personnages</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'Items' }">Objets</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'Recipes' }">Recettes</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'About' }">À propos</RouterLink>
              </li>
            </ul>
          </div>
          <RouterLink :to="{ name: 'Characters' }" class="btn btn-ghost normal-case text-xl font-heading">Palia
          </RouterLink>
        </div>
        <div class="hidden sm:block">
          <ul class="menu menu-horizontal px-1 gap-2">
            <li>
              <RouterLink :to="{ name: 'Characters' }">Personnages</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'Items' }">Objets</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'Recipes' }">Recettes</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'About' }">À propos</RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <ServerClock />
    </div>

  </header>
  <main>
    <div class="max-w-2xl mx-auto pb-6 px-4">
      <RouterView />
    </div>
  </main>
  <footer>
    <div class="max-w-2xl mx-auto py-6 text-sm text-center opacity-80 px-4">
      Tous les logos, marques et images de ce site sont la propriété de Singularity 6 Corporation.<br />
      Ce site n'est pas affilié avec l'éditeur.<br />
      Réalisé par <a href="https://thoanny.fr" target="_blank" class="underline">Thoanny</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.menu {
  @apply font-bold;

  a.router-link-active {
    @apply bg-accent text-primary;
  }
}
</style>
