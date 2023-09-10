import '/node_modules/tippy.js/dist/tippy.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {TippyPlugin} from 'tippy.vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(TippyPlugin, {
    tippyDefaults: {},
  });
app.use(router);

app.mount('#app');
