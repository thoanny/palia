<template>
    <label for="howtouse_characters" class="btn btn-primary btn-sm mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                clip-rule="evenodd" />
        </svg>
        Comment ça fonctionne&nbsp;?
    </label>
    <input type="checkbox" id="howtouse_characters" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box border">
            <label for="howtouse_characters" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30">✕</label>
            <div class="flex flex-col gap-2 p-6">
                <div class="text-2xl font-bold font-heading">
                    Comment utiliser la liste des personnages&nbsp;?
                </div>
                <div>
                    Faites un <strong class="text-accent">clic droit* sur l'avatar d'un personnage pour le
                        masquer,</strong> si vous avez terminé le niveau 4 d'amitié avec lui, par exemple.
                </div>
                <div>Si vous avez au moins un personnage masqué, cliquez sur le <strong class="text-accent">bouton
                        "Afficher les personnages masqués"</strong> tout en bas de cette page, pour les voir à nouveau.
                </div>
                <div>
                    Faites un <strong class="text-accent">clic gauche sur les objets souhaités</strong> par les
                    personnages <strong class="text-accent">pour afficher les détails</strong> de ces objets.
                </div>
                <div>
                    Faites un <strong class="text-accent">clic droit* sur ces objets souhaités pour les marquer comme
                        terminé/non terminé.</strong>
                </div>
                <div class="italic text-sm">
                    * Appuyez quelques secondes si vous utilisez un écran tactile.
                </div>
            </div>
        </div>
        <label class="modal-backdrop" for="howtouse_characters">Close</label>
    </div>
</template>

<style scoped>
.modal .border {
    border-color: var(--palia-blue);
}
</style>