<script setup>
import { RouterLink, RouterView } from 'vue-router';
import ServerClock from '@/components/ServerClock.vue';
import { onMounted, ref } from 'vue';

import ItemsIcon from '@/components/icons/Items.vue';
import CharactersIcon from '@/components/icons/Characters.vue';
import RecipesIcon from '@/components/icons/Recipes.vue';
import BundlesIcon from '@/components/icons/Bundles.vue';
import AboutIcon from '@/components/icons/About.vue';
import DownloadIcon from '@/components/icons/Download.vue';
import FishIcon from '@/components/icons/Fish.vue';
import MoreIcon from '@/components/icons/More.vue';

const installPrompt = ref(null);
const showInstallButton = ref(false);

async function handleInstallPrompt() {
  if (!installPrompt.value) return;
  const result = await installPrompt.value.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  installPrompt.value = null;
  showInstallButton.value = false;
}

onMounted(() => {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt.value = event;
    showInstallButton.value = true;
  });
});
</script>

<template>
  <header>


    <div class="navbar bg-base-100 sm:hidden mb-4">
      <RouterLink :to="{ name: 'Characters' }" class="navbar-start w-full">
        <img src="@/assets/logo.png" class="h-20 w-20 -mt-4 -mb-4 -ml-1" />
        <div class="flex flex-col leading-4">
          <span class="text-2xl font-heading">
            Palia
          </span>
          <span class="text-sm -mt-1">Boîte à outils</span>
        </div>
      </RouterLink>
      <div class="navbar-end">
        <ServerClock />
      </div>
    </div>

    <dialog id="menuModal" class="modal">
      <div class="modal-box !p-6">
        <div class="grid grid-cols-4 gap-2 font-semibold text-sm">
          <RouterLink :to="{ name: 'Characters' }" onclick="menuModal.close()"
            class="flex justify-center items-center flex-col p-4 border-2 border-primary rounded-lg gap-2 hover:bg-primary">
            <CharactersIcon />
            Personnages
          </RouterLink>
          <RouterLink :to="{ name: 'Fish' }" onclick="menuModal.close()"
            class="flex justify-center items-center flex-col p-4 border-2 border-primary rounded-lg gap-2 hover:bg-primary">
            <FishIcon />
            Pêche
          </RouterLink>
          <RouterLink :to="{ name: 'Bundles' }" onclick="menuModal.close()"
            class="flex justify-center items-center flex-col p-4 border-2 border-primary rounded-lg gap-2 hover:bg-primary">
            <BundlesIcon />
            Temples
          </RouterLink>
          <RouterLink :to="{ name: 'Items' }" onclick="menuModal.close()"
            class="flex justify-center items-center flex-col p-4 border-2 border-primary rounded-lg gap-2 hover:bg-primary">
            <ItemsIcon />
            Objets
          </RouterLink>
          <RouterLink :to="{ name: 'Recipes' }" onclick="menuModal.close()"
            class="flex justify-center items-center flex-col p-4 border-2 border-primary rounded-lg gap-2 hover:bg-primary">
            <RecipesIcon />
            Recettes
          </RouterLink>
          <button @click="handleInstallPrompt" onclick="menuModal.close()"
            class="flex justify-center items-center flex-col p-4 border-2 border-primary rounded-lg gap-2 hover:bg-primary">
            <DownloadIcon />
            Télécharger
          </button>
          <RouterLink :to="{ name: 'About' }" onclick="menuModal.close()"
            class="flex justify-center items-center flex-col p-4 border-2 border-primary rounded-lg gap-2 hover:bg-primary">
            <AboutIcon />
            À propos
          </RouterLink>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <div class="hidden sm:navbar bg-base-100 border border-primary justify-between shadow-lg shadow-secondary/25 mb-6">
      <RouterLink :to="{ name: 'Characters' }" class="flex gap-2 items-center w-48">
        <img src="@/assets/logo.png" class="h-16 w-16 -mt-2" alt="">
        <div class="flex flex-col leading-4">
          <span class="text-2xl font-heading">
            Palia
          </span>
          <span class="text-sm -mt-1">Boîte à outils</span>
        </div>
      </RouterLink>
      <div class="hidden sm:block">
        <ul class="menu menu-horizontal px-1 gap-2">
          <li class="max-[1140px]:hidden">
            <RouterLink :to="{ name: 'Characters' }">
              <CharactersIcon />
              Personnages
            </RouterLink>
          </li>
          <li class="max-[1140px]:hidden">
            <RouterLink :to="{ name: 'Fish' }">
              <FishIcon />
              Pêche
            </RouterLink>
          </li>
          <li class="max-[1140px]:hidden">
            <RouterLink :to="{ name: 'Bundles' }">
              <BundlesIcon />
              Temples
            </RouterLink>
          </li>
          <li class="max-[1140px]:hidden">
            <RouterLink :to="{ name: 'Items' }">
              <ItemsIcon />
              Objets
            </RouterLink>
          </li>
          <li class="max-[1140px]:hidden">
            <RouterLink :to="{ name: 'Recipes' }">
              <RecipesIcon />
              Recettes
            </RouterLink>
          </li>
          <!-- <li v-if="showInstallButton"> -->
          <li class="max-[1310px]:hidden">
            <button @click="handleInstallPrompt">
              <DownloadIcon />
              Télécharger
            </button>
          </li>
          <li class="max-[1310px]:hidden">
            <RouterLink :to="{ name: 'About' }">
              <AboutIcon />
              À propos
            </RouterLink>
          </li>
          <li>
            <button onclick="menuModal.showModal()">
              <MoreIcon />
              Menu
            </button>
          </li>
        </ul>
      </div>
      <div class="w-48 flex justify-end">
        <ServerClock />
      </div>
    </div>

    <div class="btm-nav sm:hidden z-30">
      <RouterLink :to="{ name: 'Characters' }">
        <CharactersIcon />
      </RouterLink>
      <RouterLink :to="{ name: 'Items' }">
        <ItemsIcon />
      </RouterLink>
      <RouterLink :to="{ name: 'Bundles' }">
        <BundlesIcon />
      </RouterLink>
      <RouterLink :to="{ name: 'Recipes' }">
        <RecipesIcon />
      </RouterLink>
      <RouterLink :to="{ name: 'About' }">
        <AboutIcon />
      </RouterLink>
      <button @click="handleInstallPrompt" v-if="showInstallButton">Télécharger</button>
    </div>

  </header>
  <main>
    <div class="container mx-auto pb-6 px-4">
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

  svg {
    @apply h-5 w-5;
  }
}

.btm-nav {

  a.router-link-active {
    @apply active text-accent;
  }

  svg {
    @apply h-8 w-8;
  }
}

#menuModal {
  svg {
    @apply h-10 w-10;
  }

  .router-link-active {
    @apply bg-accent text-primary border-accent;
  }
}
</style>
