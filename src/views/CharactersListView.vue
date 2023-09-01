<script setup>
import { ref } from 'vue';
import ItemModal from '@/components/ItemModal.vue';

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
        <p class="mb-2 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 inline-flex">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
            </svg>
            Clic gauche pour afficher plus d'informations sur l'objet.
        </p>
        <p class="mb-6 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6 inline-flex">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
            </svg>
            Clic droit (appui long en tactile) pour marquer comme terminé/non terminé.
        </p>
        <div v-if="characters" class="flex flex-col gap-4">
            <div v-for="character in characters" :key="character.id" class="character">
                <div v-if="character.skill" class="absolute bottom-1 left-16">
                    <img :src="'https://api.lebusmagique.fr/uploads/api/palia/skills/' + character.skill.icon"
                        class="w-8 h-8">
                </div>
                <div class="flex items-center gap-4">
                    <img :src="'https://api.lebusmagique.fr/uploads/api/palia/characters/avatars/' + character.avatar"
                        class="w-20 h-20 shrink-0">
                    <h4 class="mb-0 text-white">{{ character.name }}</h4>
                </div>
                <div class="flex gap-6 items-center">
                    <div v-if="character.wishes.length > 0" class="flex gap-2">
                        <ItemModal v-for="wish in character.wishes" :key="wish.id" :wish="wish.id" :item="wish.item" />
                    </div>
                    <RouterLink :to="{ name: 'Character', params: { slug: character.slug } }"
                        class="btn btn-outline btn-circle btn-lg mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-8 h-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </RouterLink>
                </div>

            </div>
        </div>
        <div class="flex justify-center" v-else>
            <button class="btn btn-primary"><span class="loading"></span>Chargement en cours</button>
        </div>
    </div>
</template>


<style scoped>
.character {
    @apply flex gap-4 border rounded-full p-2 items-center justify-between relative;
    background: var(--palia-blue-dark);
    border-color: var(--palia-blue);
}
</style>