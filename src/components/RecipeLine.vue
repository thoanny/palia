<script setup>
import ItemModal from '@/components/ItemModal.vue';
defineProps(['recipe']);
</script>

<template>
    <div class="flex gap-4 items-center border rounded-xl p-2 recipe">
        <div class="w-1/6 flex justify-center">
            <ItemModal :item="recipe.item" :quantity="recipe.quantity" class="mt-1" />
        </div>
        <div class="w-1/6 flex justify-center">
            <div class="tooltip" :data-tip="recipe.workshop.name">
                <img :src="recipe.workshop.iconEncoded" class="w-12 h-12 aspect-square object-contain" width="64"
                    height="64" v-if="recipe.workshop.icon">
                <img src="@/assets/default.png" class="w-12 h-12 aspect-square object-contain" v-else>
            </div>
        </div>
        <div class="w-1/6 flex justify-center">
            {{ recipe.craftTime }}
        </div>
        <div class="w-3/6 flex gap-2 mt-1">
            <ItemModal v-for="ingredient in recipe.ingredients" :key="ingredient.item.slug" :item="ingredient.item"
                :quantity="ingredient.quantity" />
        </div>
    </div>
</template>

<style scoped>
.recipe {
    border-color: var(--palia-blue);
}
</style>