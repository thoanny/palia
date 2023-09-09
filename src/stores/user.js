import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {

    const characterWishes = ref([]);

    function toggleCharacterWish(id) {
        const i = characterWishes.value.indexOf(id);
        if (i > -1) {
            characterWishes.value.splice(i, 1);
        } else {
            characterWishes.value.push(id);
        }
        localStorage.setItem('userWishes', JSON.stringify(characterWishes.value));
    }

    function checkCharacterWish(id) {
        return (characterWishes.value.indexOf(id) > -1) ? true : false;
    }

    function getCharacterWishes() {
        const uw = localStorage.getItem('userWishes');
        if (uw) {
            characterWishes.value = JSON.parse(uw);
        }
    }

    getCharacterWishes();

    return { toggleCharacterWish, checkCharacterWish }
});