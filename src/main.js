import '/node_modules/tippy.js/dist/tippy.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { TippyPlugin } from 'tippy.vue';
import VueMatomo from 'vue-matomo';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(TippyPlugin, {
  tippyDefaults: {},
});
app.use(router);

app.use(VueMatomo, {
  host: 'https://analytics.thoanny.fr',
  siteId: 12,
  router: router,
  disableCookies: true,
  debug: true,
})

app.mount('#app');
