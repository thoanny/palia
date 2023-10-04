<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(utc)
dayjs.extend(weekday)
dayjs.extend(isoWeek)

const countdown = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});

const countdownInterval = ref(null);

function secondsToDhms() {

    const now = dayjs.utc()
    const nextReset = dayjs.utc().isoWeekday(1).weekday(8).set('hour', 4).set('minute', 0).set('second', 0)
    const seconds = Number(nextReset.diff(now, 'second'));

    countdown.value = {
        days: Math.floor(seconds / (3600 * 24)),
        hours: Math.floor(seconds % (3600 * 24) / 3600),
        minutes: Math.floor(seconds % 3600 / 60),
        seconds: Math.floor(seconds % 60)
    }
}

onMounted(() => {
    secondsToDhms();
    countdownInterval.value = setInterval(secondsToDhms, 10000); // 10 seconds
});

onUnmounted(() => {
    if (countdownInterval.value) clearInterval(countdownInterval.value);
    countdownInterval.value = null;
});
</script>

<template>
    <div class="rounded-full border border-secondary bg-primary px-4 py-2 cursor-default" v-tippy>
        <div class="flex gap-2 font-bold text-sm">
            <div v-if="countdown.days > 0">
                <span class="countdown text-xl">
                    <span :style="{ '--value': countdown.days }"></span>
                </span>j
            </div>
            <div v-if="countdown.hours > 0 || countdown.days > 0">
                <span class="countdown text-xl">
                    <span :style="{ '--value': countdown.hours }"></span>
                </span>h
            </div>
            <div v-if="countdown.hours > 0 || countdown.days > 0 || countdown.minutes > 0">
                <span class="countdown text-xl">
                    <span :style="{ '--value': countdown.minutes }"></span>
                </span>min
            </div>
            <div v-else>Les souhaits sont réinitialisés</div>
        </div>
    </div>
    <tippy>Réinitialisation des souhaits</tippy>
</template>

