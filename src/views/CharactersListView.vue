<script setup>
import { ref } from 'vue';

import ItemModal from '@/components/ItemModal.vue';
import HowToUseCharactersList from '@/components/HowToUseCharactersList.vue';
import CharactersWishesResetCountdown from '@/components/CharactersWishesResetCountdown.vue';
import CharactersIcon from '@/components/icons/Characters.vue';

const allCharacters = ref(null);
const characters = ref(null);
const hiddenCharacters = ref([]);

async function getCharacters() {
    try {
        const res = await fetch(import.meta.env.VITE_LBM_API + '/characters');
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

getCharacters().then(c => {
    characters.value = c;
    allCharacters.value = c;
}).then(() => {
    getHiddenCharacters();
});

function hideCharacter(slug) {
    const i = hiddenCharacters.value.indexOf(slug);
    if (i < 0) {
        hiddenCharacters.value.push(slug);
    }
    localStorage.setItem('hiddenCharacters', JSON.stringify(hiddenCharacters.value));
    characters.value = characters.value.filter(c => hiddenCharacters.value.indexOf(c.slug) < 0);
}

function getHiddenCharacters() {
    const ch = localStorage.getItem('hiddenCharacters');
    if (ch) {
        hiddenCharacters.value = JSON.parse(ch);
        characters.value = characters.value.filter(c => ch.indexOf(c.slug) < 0);
    }
}

function showAllCharacters() {
    characters.value = allCharacters.value;
    hiddenCharacters.value = [];
    localStorage.removeItem('hiddenCharacters');
}

</script>

<template>
    <div>
        <div class="flex flex-col md:flex-row gap-4 justify-between items-start mb-6">
            <div>
                <h1 class="flex gap-4">
                    <CharactersIcon />
                    Personnages
                </h1>
                <HowToUseCharactersList v-if="characters" />
            </div>
            <CharactersWishesResetCountdown />
        </div>

        <div v-if="characters">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-6">
                <div class="card bg-base-100 relative border character" v-for="character in characters" :key="character.id">
                    <div class="card-body pb-6">
                        <button class="btn btn-sm btn-square btn-ghost absolute top-5 right-4"
                            @click="hideCharacter(character.slug)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>
                        <div class="flex gap-4 -mt-10 -ml-10 items-center mb-2">
                            <RouterLink :to="{ name: 'Character', params: { slug: character.slug } }">
                                <img :src="'https://api.lebusmagique.fr/uploads/api/palia/characters/avatars/' + character.avatar"
                                    alt="" class="w-20 h-20 shrink-0" width="80" height="80" rel="preload">
                            </RouterLink>
                            <h2 class="card-title mt-2 mb-0">{{ character.name }}</h2>
                            <div v-if="character.skill" class="mt-2">
                                <img :src="'https://api.lebusmagique.fr/uploads/api/palia/skills/' + character.skill.icon"
                                    class="w-8 h-8" width="32" height="32">
                            </div>
                        </div>
                        <div v-if="character.wishes.length > 0" class="flex justify-center gap-2 mb-2">
                            <ItemModal v-for="wish in character.wishes" :key="wish.id" :wish="wish.id" :item="wish.item" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-center gap-2">
                <button @click="showAllCharacters" class="btn btn-primary" v-if="hiddenCharacters.length > 0">Afficher
                    {{ (hiddenCharacters.length) > 1
                        ? 'les ' + hiddenCharacters.length + ' personnages masqués'
                        : 'le personnage masqué' }}</button>
            </div>
        </div>
        <div class="flex justify-center" v-else>
            <button class="btn btn-primary"><span class="loading"></span>Chargement en cours</button>
        </div>
    </div>
</template>

<style scoped>
.character {
    border-color: var(--palia-blue);
    background: var(--palia-blue-dark);
}
</style>
