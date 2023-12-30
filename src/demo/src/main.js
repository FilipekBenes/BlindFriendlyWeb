import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setBFL } from '../../lib/speaker';

const app = createApp(App);
app.use(router);
app.mount('#app');

setBFL(1,1,1.2,"en");

