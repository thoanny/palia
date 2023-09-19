import { createRouter, createWebHistory } from 'vue-router';
import CharactersList from '../views/CharactersListView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: '',
          name: 'Characters',
          component: CharactersList,
        },
        {
          path: 'personnages/:slug',
          name: 'Character',
          props: true,
          component: () => import('../views/CharacterView.vue')
        }
      ]
    },
    {
      path: '/objets',
      children: [
        {
          path: '',
          name: 'Items',
          component: () => import('../views/ItemsListView.vue'),
        },
        {
          path: ':slug',
          name: 'Item',
          props: true,
          component: () => import('../views/ItemView.vue'),
        }
      ]
    },
    {
      path: '/recettes',
      children: [
        {
          path: '',
          name: 'Recipes',
          component: () => import('../views/RecipesListView.vue')
        }
      ]
    },
    {
      path: '/a-propos',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
