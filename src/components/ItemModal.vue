<script setup>
import { useUserStore } from '@/stores/user';

const props = defineProps(['wish', 'item']);
const user = useUserStore();

function getLocationsText(locations) {
    let locationText = [];
    locations.forEach(l => {
        locationText.push(l.name)
    });
    return locationText.join(', ');
}

</script>

<template>
    <div>
        <label :for="(wish) ? 'modal-whish-' + wish : 'modal-item-' + item.slug"
            @contextmenu.prevent="(wish) ? user.toggleCharacterWish(wish) : true" class="relative tooltip"
            :data-tip="item.name">
            <img :src="'https://api.lebusmagique.fr/uploads/api/palia/items/' + item.icon" class="item-icon"
                :class="{ 'opacity-50': wish && user.checkCharacterWish(wish) }" v-if="item.icon">
            <img src="@/assets/default.png" :class="{ 'opacity-50': wish && user.checkCharacterWish(wish) }"
                class="item-icon" v-else>
            <input v-if="wish" type="checkbox" class="checkbox checkbox-sm checkbox-success absolute -bottom-1 -right-1"
                :class="{ 'hidden': !user.checkCharacterWish(wish) }" :checked="user.checkCharacterWish(wish)">
        </label>
        <input type="checkbox" :id="(wish) ? 'modal-whish-' + wish : 'modal-item-' + item.slug" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box" :class="'rarity-' + item.rarity">
                <label :for="(wish) ? 'modal-whish-' + wish : 'modal-item-' + item.slug"
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30">✕</label>
                <div class="modal-header relative">
                    <div class="z-20 relative p-6 pb-14 flex flex-col gap-2">
                        <div class="text-2xl font-bold leading-5 font-heading">{{ item.name }}</div>
                        <div v-if="item.description">{{ item.description }}</div>
                        <div v-if="item.comment">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-6 h-6 inline-flex">
                                <path fill-rule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ item.comment }}
                        </div>
                        <div v-if="item.locations.length > 0" class="inline-flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd"
                                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span v-text="getLocationsText(item.locations)"></span>
                        </div>
                    </div>
                    <div class="custom-divider z-10">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                            preserveAspectRatio="none">
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                class="shape-fill"></path>
                        </svg>
                    </div>
                </div>
                <div class="p-6 pt-0 flex flex-col gap-2">
                    <div class="text-xl font-semibold font-heading">{{ item.category.name }}</div>
                    <div class="flex gap-1" v-if="item.focus || item.focusQuality">
                        <div class="badge text-green-400 gap-1" v-if="item.focus">
                            +{{ item.focus }} de concentration
                        </div>
                        <div class="badge text-green-400 gap-1" v-if="item.focusQuality">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="w-4 h-4 text-yellow-500">
                                <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd" />
                            </svg>
                            +{{ item.focusQuality }} de concentration
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="flex justify-start items-center gap-1" v-if="item.priceBase || item.priceQuality">
                            <div class="font-semibold">Prix&nbsp;:</div>
                            <div v-if="item.priceBase" class="flex gap-1 items-center">
                                {{ item.priceBase }}
                                <img src="@/assets/gold.png" class="w-6 h-6" alt="pièce(s) d'or">
                            </div>
                        </div>
                        <div class="flex justify-start items-center gap-1" v-if="item.priceQuality">
                            <div class="font-semibold inline-flex gap-1 items-center">
                                Prix <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-5 h-5 text-yellow-500">
                                    <path fill-rule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clip-rule="evenodd" />
                                </svg>:
                            </div>
                            <div v-if="item.priceQuality" class="flex gap-1 items-center">
                                {{ item.priceQuality }}
                                <img src="@/assets/gold.png" class="w-6 h-6" alt="pièce(s) d'or">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <label class="modal-backdrop" :for="(wish) ? 'modal-whish-' + wish : 'modal-item-' + item.slug">Fermer</label>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.item-icon {
    @apply w-16 h-16 aspect-square object-contain rounded-lg border-2 cursor-pointer p-1 shrink-0 flex;
    background: var(--palia-sand);
    border-color: var(--palia-sand-dark);
}

.custom-divider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);

    svg {
        position: relative;
        display: block;
        width: calc(100% + 1.3px);
        height: 41px;
    }
}

/* Default */
.modal-box {
    background: var(--palia-rarity-default-secondary);

    .modal-header {
        background: var(--palia-rarity-default-primary);
    }

    .custom-divider {
        .shape-fill {
            fill: var(--palia-rarity-default-secondary);
        }
    }


    /* Common */
    &.rarity-common {
        background: var(--palia-rarity-common-secondary);

        .modal-header {
            background: var(--palia-rarity-common-primary);
        }

        .custom-divider {
            .shape-fill {
                fill: var(--palia-rarity-common-secondary);
            }
        }
    }

    /* Uncommon */
    &.rarity-uncommon {
        background: var(--palia-rarity-uncommon-secondary);

        .modal-header {
            background: var(--palia-rarity-uncommon-primary);
        }

        .custom-divider {
            .shape-fill {
                fill: var(--palia-rarity-uncommon-secondary);
            }
        }
    }

    /* Rare */
    &.rarity-rare {
        background: var(--palia-rarity-rare-secondary);

        .modal-header {
            background: var(--palia-rarity-rare-primary);
        }

        .custom-divider {
            .shape-fill {
                fill: var(--palia-rarity-rare-secondary);
            }
        }
    }

    /* Epic */
    &.rarity-epic {
        background: var(--palia-rarity-epic-secondary);

        .modal-header {
            background: var(--palia-rarity-epic-primary);
        }

        .custom-divider {
            .shape-fill {
                fill: var(--palia-rarity-epic-secondary);
            }
        }
    }
}
</style>