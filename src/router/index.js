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
          path: 'characters/:slug',
          name: 'Character',
          props: true,
          component: () => import('../views/CharacterView.vue')
        }
      ]
    },
    {
      path: '/items',
      name: 'Items',
      component: () => import('../views/ItemsListView.vue')
    },
    {
      path: '/recipes',
      children: [
        {
          path: '',
          name: 'Recipes',
          component: () => import('../views/RecipesListView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
