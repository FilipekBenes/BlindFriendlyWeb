import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setBFL, setKeyBFL } from '../../lib/index';

const app = createApp(App);
app.use(router);
app.mount('#app');

const myKey = {
    kscFocus: 'event.key === "1"',
    kscSpeaker: 'event.key === "2"',
    kscVoiceControl: 'event.key === "3"',
    kscManual: 'event.key === "4"',
};
setBFL(1, 1, 1.2, "en");
setKeyBFL(myKey);
