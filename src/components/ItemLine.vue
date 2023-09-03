<script setup>
defineProps(['item']);
</script>

<template>
    <div class="flex items-center gap-2 border rounded-xl p-2 item-line">
        <div class="w-4/6 flex gap-4 items-center">
            <img :src="'https://api.lebusmagique.fr/uploads/api/palia/items/' + item.icon" class="item-icon" v-if="item.icon">
            <img src="@/assets/default.png" class="item-icon" v-else>
            <div>
                <div class="font-bold">{{ item.name }}</div>
                <span class="badge badge-sm badge-primary">{{ item.category.name }}</span>
                <div v-if="item.comment" class="text-sm leading-4">{{ item.comment }}</div>
            </div>
        </div>
        <div class="w-1/6">
            <div v-if="item.priceQuality" class="flex gap-1 items-center justify-end">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-yellow-500">
                    <path fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd" />
                </svg>
                {{ item.priceQuality }}
                <img src="@/assets/gold.png" class="w-6 h-6" alt="pièce(s) d'or">
            </div>
        </div>
        <div class="w-1/6">
            <div v-if="item.priceBase" class="flex gap-1 items-center justify-end">
                {{ item.priceBase }}
                <img src="@/assets/gold.png" class="w-6 h-6" alt="pièce(s) d'or">
            </div>
        </div>
    </div>
</template>

<style scoped>
.item-icon {
    @apply w-20 h-20 cursor-default self-start;
}
.item-line {
    border-color: var(--palia-blue);
}
</style>