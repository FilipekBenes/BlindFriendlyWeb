import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../../lib/speaker';
import { setTTS } from '../../lib/speaker';

const app = createApp(App);
app.use(router);
app.mount('#app');

setTTS(1,1,1.2,"en");

