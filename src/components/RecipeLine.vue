<script setup>
import ItemModal from '@/components/ItemModal.vue';
defineProps(['recipe']);

function formatTime(seconds) {
    const totalMinutes = Math.floor(seconds / 60);

    const s = seconds % 60;
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;

    return ((h) ? `${h} h ` : '') + ((m) ? `${m} min ` : '') + ((s) ? `${s} s` : '');
}
</script>

<template>
    <div class="flex gap-4 items-center border border-secondary bg-primary rounded-xl p-2 px-3 pt-3">
        <div class="w-16 flex">
            <ItemModal :item="recipe.item" :quantity="recipe.quantity" />
        </div>
        <div class="w-16 flex">
            <ItemModal :item="recipe.workshop" :cls="'workshop'" />
        </div>
        <div class="w-8 flex justify-center">
            <div v-if="recipe.craftTime > 0">
                <div v-tippy>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-6 h-6 text-accent">
                        <path fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
                <tippy>{{ formatTime(recipe.craftTime) }}</tippy>
            </div>
        </div>
        <div class="flex-1 justify-end flex gap-2">
            <ItemModal v-for="ingredient in recipe.ingredients" :key="ingredient.item.slug" :item="ingredient.item"
                :quantity="ingredient.quantity" />
        </div>
    </div>
</template>