<script setup>
import { ref } from 'vue';
import ItemModal from '@/components/ItemModal.vue';

const items = ref(null);
const categories = ref([]);
const category = ref(0);

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

async function getItems() {
    try {
        const res = await fetch('https://api.lebusmagique.fr/api/palia/items');
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

getItems().then(c => {
    items.value = c;

    c.forEach(e => {
        const i = categories.value.findIndex(cat => cat.id === e.category?.id);
        if (i < 0) {
            categories.value.push(e.category);
        }
    });

    categories.value = sortArrayOfObjects(categories.value, "name")
});

</script>

<template>
    <div>
        <h1>Objets</h1>
        <div v-if="items">
            <div class="form-control flex-row items-center gap-2 mb-6">
                <label class="label">
                    <span class="label-text font-bold">Catégorie</span>
                </label>
                <select id="category" class="select select-bordered select-sm" v-model="category">
                    <option value="0">-- Sélectionner --</option>
                    <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <div class="flex gap-x-2 gap-y-1 flex-wrap justify-center">
                <ItemModal v-for="item in items" :key="item.id" :item="item"
                    v-show="category == 0 || category === item.category.id" />
            </div>
        </div>
        <div class="flex justify-center" v-else>
            <button class="btn btn-primary"><span class="loading"></span>Chargement en cours</button>
        </div>
    </div>
</template>