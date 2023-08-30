<script setup>
import { ref } from 'vue';

const characters = ref(null);
const userWhishes = ref([]);

async function getCharacters() {
	try {
		const res = await fetch('https://api.lebusmagique.fr/api/palia/characters');
		return await res.json();
	} catch (error) {
		console.error(error);
	}
}

getCharacters().then(c => {
	characters.value = c;
});

function getUserWhises() {
	const uw = localStorage.getItem('userWishes');
	if (uw) {
		userWhishes.value = JSON.parse(uw);
	}
}

function toggleWish(id) {
	const i = userWhishes.value.indexOf(id);
	if (i > -1) {
		userWhishes.value.splice(i, 1);
	} else {
		userWhishes.value.push(id);
	}
	localStorage.setItem('userWishes', JSON.stringify(userWhishes.value));
}

function checkWish(id) {
	return (userWhishes.value.indexOf(id) > -1) ? true : false;
}

getUserWhises();

</script>

<template>
	<div>
		<h1 class="text-center">Personnages</h1>
		<p class="text-center mb-2 font-semibold">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				class="w-6 h-6 inline-flex">
				<path stroke-linecap="round" stroke-linejoin="round"
					d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
			</svg>
			Clic gauche pour afficher plus d'informations sur l'objet.
		</p>
		<p class="text-center mb-6 font-semibold">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
				class="w-6 h-6 inline-flex">
				<path stroke-linecap="round" stroke-linejoin="round"
					d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
			</svg>
			Clic droit (appui long en tactile) pour marquerl'objet comme terminé/non terminé.
		</p>
		<div v-if="characters" class="flex flex-col gap-4">
			<div v-for="character in characters" :key="character.id" class="character">
				<div v-if="character.skill" class="absolute bottom-1 left-16">
					<img :src="'https://api.lebusmagique.fr/uploads/api/palia/skills/' + character.skill.icon"
						class="w-8 h-8">
				</div>
				<div class="flex items-center gap-4">
					<img :src="'https://api.lebusmagique.fr/uploads/api/palia/characters/avatars/' + character.avatar"
						class="w-20 h-20 shrink-0">
					<h4 class="mb-0 text-white">{{ character.name }}</h4>
				</div>
				<div class="flex gap-6 items-center">
					<div v-if="character.wishes.length > 0" class="flex gap-2">
						<div v-for="wish in character.wishes" :key="wish.id">
							<label :for="'modal-whish' + wish.id" @contextmenu.prevent="toggleWish(wish.id)"
								class="relative">
								<img :src="'https://api.lebusmagique.fr/uploads/api/palia/items/' + wish.item.icon"
									class="item-icon" :class="{ 'opacity-50': checkWish(wish.id) }" v-if="wish.item.icon">
								<img src="@/assets/default.png" :class="{ 'opacity-50': checkWish(wish.id) }"
									class="item-icon" v-else>
								<input type="checkbox"
									class="checkbox checkbox-sm checkbox-success absolute -bottom-1 -right-1"
									:class="{ 'hidden': !checkWish(wish.id) }" :checked="checkWish(wish.id)">
							</label>
							<input type="checkbox" :id="'modal-whish' + wish.id" class="modal-toggle" />
							<div class="modal">
								<div class="modal-box" :class="'rarity-' + wish.item.rarity">
									<label :for="'modal-whish' + wish.id"
										class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30">✕</label>

									<div class="modal-header relative bg-blue-500">
										<div class="z-20 relative p-6 pb-14 flex flex-col gap-2">
											<div class="text-2xl font-bold leading-5">{{ wish.item.name }}</div>
											<div v-if="wish.item.description">{{ wish.item.description }}</div>
											<div v-if="wish.item.comment">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
													fill="currentColor" class="w-6 h-6 inline-flex">
													<path fill-rule="evenodd"
														d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
														clip-rule="evenodd" />
												</svg>
												{{ wish.item.comment }}
											</div>
										</div>
										<div class="custom-divider z-10">
											<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 1200 120" preserveAspectRatio="none">
												<path
													d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
													class="shape-fill"></path>
											</svg>
										</div>
									</div>
									<div class="p-6 pt-0 flex flex-col gap-2">
										<div class="text-xl font-semibold">{{ wish.item.category.name }}</div>

										<div class="flex gap-1" v-if="wish.item.focus || wish.item.focusQuality">
											<div class="badge text-green-400 gap-1" v-if="wish.item.focus">
												+{{ wish.item.focus }} de concentration
											</div>
											<div class="badge text-green-400 gap-1" v-if="wish.item.focusQuality">
												<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
													fill="currentColor" class="w-4 h-4 text-yellow-500">
													<path fill-rule="evenodd"
														d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
														clip-rule="evenodd" />
												</svg>
												+{{ wish.item.focusQuality }} de concentration
											</div>
										</div>

										<div class="flex gap-4">
											<div class="flex justify-start items-center gap-1"
												v-if="wish.item.priceBase || wish.item.priceQuality">
												<div class="font-semibold">Prix&nbsp;:</div>
												<div v-if="wish.item.priceBase" class="flex gap-1 items-center">
													{{ wish.item.priceBase }}
													<img src="@/assets/gold.png" class="w-6 h-6" alt="pièce(s) d'or">
												</div>
											</div>
											<div class="flex justify-start items-center gap-1"
												v-if="wish.item.priceQuality">
												<div class="font-semibold inline-flex gap-1 items-center">
													Prix <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
														fill="currentColor" class="w-5 h-5 text-yellow-500">
														<path fill-rule="evenodd"
															d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
															clip-rule="evenodd" />
													</svg>:
												</div>
												<div v-if="wish.item.priceQuality" class="flex gap-1 items-center">
													{{ wish.item.priceQuality }}
													<img src="@/assets/gold.png" class="w-6 h-6" alt="pièce(s) d'or">
												</div>
											</div>
										</div>
									</div>
								</div>
								<label class="modal-backdrop" :for="'modal-whish' + wish.id">Fermer</label>
							</div>
						</div>
					</div>
					<button class="btn btn-outline btn-circle btn-lg">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
							stroke="currentColor" class="w-8 h-8">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
					</button>
				</div>

			</div>
		</div>
		<div v-else>
			<button class="btn btn-primary"><span class="loading"></span>Chargement en cours</button>
		</div>
	</div>
</template>


<style scoped>
.character {
	@apply flex gap-4 border rounded-full p-2 items-center justify-between relative;
	background: var(--palia-blue-dark);
	border-color: var(--palia-blue);
}

.item-icon {
	@apply w-16 h-16 aspect-square object-contain rounded-lg border-2 cursor-pointer p-1 shrink-0 flex;
	background: var(--palia-sand);
	border-color: var(--palia-sand-dark);
}

.modal-backdrop {
	@apply bg-base-100 bg-opacity-75;
}

.modal-box {
	@apply p-0 text-white;
}

.custom-divider {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);
}

.custom-divider svg {
	position: relative;
	display: block;
	width: calc(100% + 1.3px);
	height: 41px;
}

/* Default */

.modal-box {
	background: var(--palia-rarity-default-secondary);
}

.modal-box .modal-header {
	background: var(--palia-rarity-default-primary);
}

.modal-box .custom-divider .shape-fill {
	fill: var(--palia-rarity-default-secondary);
}

/* Common */

.modal-box.rarity-common {
	background: var(--palia-rarity-common-secondary);
}

.modal-box.rarity-common .modal-header {
	background: var(--palia-rarity-common-primary);
}

.modal-box.rarity-common .custom-divider .shape-fill {
	fill: var(--palia-rarity-common-secondary);
}

/* Uncommon */

.modal-box.rarity-uncommon {
	background: var(--palia-rarity-uncommon-secondary);
}

.modal-box.rarity-uncommon .modal-header {
	background: var(--palia-rarity-uncommon-primary);
}

.modal-box.rarity-uncommon .custom-divider .shape-fill {
	fill: var(--palia-rarity-uncommon-secondary);
}

/* Rare */

.modal-box.rarity-rare {
	background: var(--palia-rarity-rare-secondary);
}

.modal-box.rarity-rare .modal-header {
	background: var(--palia-rarity-rare-primary);
}

.modal-box.rarity-rare .custom-divider .shape-fill {
	fill: var(--palia-rarity-rare-secondary);
}

/* Epic */

.modal-box.rarity-epic {
	background: var(--palia-rarity-epic-secondary);
}

.modal-box.rarity-epic .modal-header {
	background: var(--palia-rarity-epic-primary);
}

.modal-box.rarity-epic .custom-divider .shape-fill {
	fill: var(--palia-rarity-epic-secondary);
}
</style>