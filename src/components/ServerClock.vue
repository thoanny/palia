<script setup>

// Source : https://github.com/SharkyTheWhite/palia-clock?ref=vuejsexamples.com

import { computed, onMounted, onUnmounted, ref } from 'vue';

const realTimePST = ref(0);
const todInterval = ref(null);

const PST_UTC_SUNDAY_OFFSET = 60 * 60 * (8 + 3 * 24);
const MINUTE = 60;
const HOUR = 60 * 60;
const DAY = 60 * 60 * 24;

function updateRealTime() {
    const now = new Date();
    const epoch_seconds = now.getTime() / 1000;
    realTimePST.value = epoch_seconds - PST_UTC_SUNDAY_OFFSET;
}

onMounted(() => {
    updateRealTime();
    todInterval.value = setInterval(updateRealTime, 250);
});

onUnmounted(() => {
    if (todInterval.value) clearInterval(todInterval.value);
    todInterval.value = null;
});

const palianTimeOfDay = computed(() => {
    return (realTimePST.value * 24) % DAY;
});

function d2(x) {
    return x.toFixed(0).padStart(2, '0');
}

const clockText = computed(() => {
    const palianTimeOfDayMinutes = Math.floor(palianTimeOfDay.value / MINUTE);
    const m = palianTimeOfDayMinutes % 60;
    const h = (palianTimeOfDayMinutes - m) / 60;
    return `${d2(h)}:${d2(m)}`;
});

const partOfDay = computed(() => {
    const h = palianTimeOfDay.value / HOUR;
    if (h >= 21 || h < 3) return 'nuit'; // 21 to 3
    if (h >= 18) return 'soir'; // 18 to 21
    if (h >= 6) return 'jour'; // 6 to 18
    return 'matin'; // 3 to 6
});

</script>

<template>
    <div class="absolute top-2 flex gap-1 justify-center w-full text-xs font-bold opacity-75 left-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
            <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                clip-rule="evenodd" />
        </svg>
        {{ clockText }} ({{ partOfDay }})
    </div>
</template>