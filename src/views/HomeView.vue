<script setup>
import { ref } from 'vue';

const characters = ref(null);

async function getCharacters() {
  try {
    const res = await fetch('https://api.lebusmagique.fr/api/palia/characters');
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

getCharacters().then(c => {
  characters.value = c;
});
</script>

<template>
  <div>
    <h1>Personnages</h1>
    <div v-if="characters" class="flex flex-col gap-4">
      <div v-for="character in characters" :key="character.id"
        class="flex gap-4 border shadow-lg rounded-xl p-4 items-center justify-between relative">
        <div v-if="character.skill" class="absolute bottom-2 left-16">
          <img :src="'https://api.lebusmagique.fr/uploads/api/palia/skills/' + character.skill.icon" class="w-8 h-8">
        </div>
        <div class="flex items-center gap-4">
          <img :src="'https://api.lebusmagique.fr/uploads/api/palia/characters/avatars/' + character.avatar"
            class="w-20 h-20">
          <h4 class="mb-0">{{ character.name }}</h4>
        </div>
        <div v-if="character.wishes.length > 0" class="flex gap-2">
          <div v-for="wish in character.wishes" :key="wish.id">

            <label :for="'modal-whish' + wish.id"><img
                :src="'https://api.lebusmagique.fr/uploads/api/palia/items/' + wish.item.icon"
                class="w-16 h-16 aspect-square object-contain rounded-lg border-2 cursor-pointer"></label>
            <input type="checkbox" :id="'modal-whish' + wish.id" class="modal-toggle" />
            <div class="modal">
              <div class="modal-box">
                <h3 class="mb-2">{{ wish.item.name }}</h3>
                <div class="badge badge-primary">{{ wish.item.category.name }}</div>
                <p class="py-2" v-if="wish.item.description">{{ wish.item.description }}</p>
                <p class="py-2 font-semibold" v-if="wish.item.focus">+{{ wish.item.focus }} concentration</p>
                <p class="py-2" v-if="wish.item.comment">{{ wish.item.comment }}</p>
                <div class="py-2 flex justify-start items-center gap-2"
                  v-if="wish.item.priceBase || wish.item.priceQuality">
                  <div class="font-semibold">Prix&nbsp;:</div>
                  <div v-if="wish.item.priceBase">{{ wish.item.priceBase }}</div>
                  <div v-if="wish.item.priceQuality">⭐{{ wish.item.priceQuality }}</div>
                </div>
                <div class="modal-action">
                  <label :for="'modal-whish' + wish.id" class="btn btn-block">Fermer</label>
                </div>
              </div>
              <label class="modal-backdrop" :for="'modal-whish' + wish.id">Fermer</label>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <button class="btn"><span class="loading"></span>Chargement en cours</button>
    </div>
  </div>
</template>
