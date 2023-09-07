<script setup>
import { ref } from 'vue';
import ItemModal from '@/components/ItemModal.vue';

const allCharacters = ref(null);
const characters = ref(null);
const hiddenCharacters = ref([]);

async function getCharacters() {
    try {
        const res = await fetch(import.meta.env.VITE_LBM_API + '/api/palia/characters');
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

getCharacters().then(c => {

    c.forEach(el => {
        const avatar = new Image();
        avatar.src = img(el.avatar, 'characters/avatar');

        if (el.wishes) {
            el.wishes.forEach(w => {
                const wish = new Image();
                wish.src = img(w.item.icon, 'item');
            });
        }
    });

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

function img(i, t) {
    return import.meta.env.VITE_LBM_API + '/uploads/api/palia/' + t + 's/' + i;
}

</script>

<template>
    <div>
        <h1>Personnages</h1>

        <label for="howtouse_characters" class="btn btn-primary btn-sm mb-6" v-if="characters">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd" />
            </svg>
            Comment ça fonctionne&nbsp;?
        </label>
        <input type="checkbox" id="howtouse_characters" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box border">
                <label for="howtouse_characters"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30">✕</label>
                <div class="flex flex-col gap-2 p-6">
                    <div class="text-2xl font-bold font-heading">
                        Comment utiliser la liste des personnages&nbsp;?
                    </div>
                    <div>
                        Faites un <strong class="text-accent">clic droit* sur l'avatar d'un personnage pour le
                            masquer,</strong> si vous avez terminé le niveau 4 d'amitié avec lui, par exemple.
                    </div>
                    <div>Si vous avez au moins un personnage masqué, cliquez sur le <strong class="text-accent">bouton
                            "Afficher les personnages masqués"</strong> tout en bas de cette page, pour les voir à nouveau.
                    </div>
                    <div>
                        Faites un <strong class="text-accent">clic gauche sur les objets souhaités</strong> par les
                        personnages <strong class="text-accent">pour afficher les détails</strong> de ces objets.
                    </div>
                    <div>
                        Faites un <strong class="text-accent">clic droit* sur ces objets souhaités pour les marquer comme
                            terminé/non terminé.</strong>
                    </div>
                    <div class="italic text-sm">
                        * Appuyez quelques secondes si vous utilisez un écran tactile.
                    </div>
                </div>
            </div>
            <label class="modal-backdrop" for="howtouse_characters">Close</label>
        </div>

        <div v-if="characters" class="flex flex-col gap-4">
            <div v-for="character in characters" :key="character.id" class="character">
                <div v-if="character.skill" class="absolute top-2 right-2 sm:top-auto sm:bottom-1 sm:left-16">
                    <img :src="img(character.skill.icon, 'skill')" class="w-8 h-8" width="32" height="32">
                </div>
                <div class="flex items-center gap-4">
                    <img :src="img(character.avatar, 'characters/avatar')" alt="" class="w-20 h-20 shrink-0"
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
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
.modal .border {
    border-color: var(--palia-blue);
}

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
