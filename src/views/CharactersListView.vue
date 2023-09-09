<script setup>
import { ref } from 'vue';
import ItemModal from '@/components/ItemModal.vue';
import HowToUseCharactersList from '@/components/HowToUseCharactersList.vue';

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
        <h1>Personnages</h1>

        <HowToUseCharactersList v-if="characters" />

        <div v-if="characters" class="flex flex-col gap-4">
            <div v-for="character in characters" :key="character.id" class="character">
                <div v-if="character.skill" class="absolute top-2 right-2 sm:top-auto sm:bottom-1 sm:left-16">
                    <img :src="character.skill.iconEncoded" class="w-8 h-8" width="32" height="32">
                </div>
                <div class="flex items-center gap-4">
                    <img :src="character.avatarEncoded" alt="" class="w-20 h-20 shrink-0"
                        @contextmenu.prevent="hideCharacter(character.slug)" width="80" height="80" rel="preload">
                    <h4 class="mb-0 text-white">{{ character.name }}</h4>
                </div>
                <div class="flex gap-6 items-center">
                    <div v-if="character.wishes.length > 0" class="flex gap-2">
                        <ItemModal v-for="wish in character.wishes" :key="wish.id" :wish="wish.id" :item="wish.item" />
                    </div>
                    <RouterLink :to="{ name: 'Character', params: { slug: character.slug } }"
                        class="hidden sm:flex btn btn-outline btn-circle btn-lg mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </RouterLink>
                </div>
                <RouterLink :to="{ name: 'Character', params: { slug: character.slug } }"
                    class="flex sm:hidden btn btn-outline btn-sm">
                    Fiche détaillée de {{ character.name }}
                </RouterLink>
            </div>
            <div class="flex justify-center gap-2">
                <button @click="showAllCharacters" class="btn btn-primary btn-sm"
                    v-if="hiddenCharacters.length > 0">Afficher
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
    @apply flex gap-4 border p-4 items-center justify-between relative flex-col rounded-xl;
    border-color: var(--palia-blue);
    background: var(--palia-blue-dark);
}

@media screen(sm) {
    .character {
        @apply rounded-full flex-row p-2;
    }

}
</style>
