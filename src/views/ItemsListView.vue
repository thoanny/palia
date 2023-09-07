<script setup>
import { ref } from 'vue';
import ItemModal from '@/components/ItemModal.vue';
import ItemLine from '@/components/ItemLine.vue';

const items = ref(null);
const categories = ref([]);
const category = ref(0);
const displayDetails = ref(false);

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
        const res = await fetch(import.meta.env.VITE_LBM_API + '/api/palia/items');
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
            <div class="flex justify-between items-center mb-6">
                <div class="form-control flex-row items-center gap-2">
                    <label class="label">
                        <span class="label-text font-bold">Catégorie</span>
                    </label>
                    <select id="category" class="select select-bordered select-sm" v-model="category">
                        <option value="0">-- Sélectionner --</option>
                        <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}
                        </option>
                    </select>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer gap-2">
                        <input type="checkbox" class="toggle toggle-sm" v-model="displayDetails" />
                        <span class="label-text">Détails</span>
                    </label>
                </div>
            </div>

            <div class="flex flex-wrap justify-center gap-x-2 gap-y-1" v-if="!displayDetails">
                <ItemModal v-for="item in items" :key="item.id" :item="item"
                    v-show="category == 0 || category === item.category.id" />
            </div>
            <div class="flex flex-col gap-2" v-else>
                <ItemLine v-for="item in items" :key="item.id" :item="item"
                    v-show="category == 0 || category === item.category.id" />
            </div>
        </div>
        <div class="flex justify-center" v-else>
            <button class="btn btn-primary"><span class="loading"></span>Chargement en cours</button>
        </div>
    </div>
</template>