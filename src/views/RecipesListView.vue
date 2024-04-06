<script setup>
import { ref } from 'vue';
import RecipeLine from '@/components/RecipeLine.vue';
import RecipesIcon from '@/components/icons/Recipes.vue';

const recipes = ref(null);
const workshops = ref([]);
const workshop = ref('');

const sortArrayOfObjects = (arr, propertyName, order = 'ascending') => {
    const sortedArr = arr.sort((a, b) => {
        if (a[propertyName] < b[propertyName]) {
            return -1;
        }
        if (a[propertyName] > b[propertyName]) {
            return 1;
        }
        return 0;
    });

    if (order === 'descending') {
        return sortedArr.reverse();
    }

    return sortedArr;
};

async function getRecipes() {
    try {
        const res = await fetch(import.meta.env.VITE_LBM_API + '/recipes');
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

getRecipes().then(r => {
    recipes.value = r;

    r.forEach(e => {
        const i = workshops.value.findIndex(ws => ws.slug === e.workshop?.slug);
        if (i < 0) {
            workshops.value.push(e.workshop);
        }
    });

    workshops.value = sortArrayOfObjects(workshops.value, "name")
});

</script>

<template>
    <div>
        <h1 class="flex gap-4">
            <RecipesIcon />
            Recettes
        </h1>
        <div v-if="recipes">
            <div class="flex justify-between items-center mb-6">
                <div class="form-control flex-row items-center gap-2">
                    <label class="label">
                        <span class="label-text font-bold">Atelier</span>
                    </label>
                    <select id="category" class="select select-bordered select-sm" v-model="workshop">
                        <option value="">-- Sélectionner --</option>
                        <option v-for="workshop in workshops" :key="workshop.slug" :value="workshop.slug">
                            {{ workshop.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <RecipeLine v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"
                    v-show="!workshop || workshop === recipe.workshop.slug" />
            </div>
        </div>
        <div class="flex justify-center" v-else>
            <button class="btn btn-primary"><span class="loading"></span>Chargement en cours</button>
        </div>
    </div>
</template>