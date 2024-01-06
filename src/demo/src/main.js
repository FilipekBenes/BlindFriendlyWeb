import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setBFL, setKeyBFL } from '../../lib/speaker';

const app = createApp(App);
app.use(router);
app.mount('#app');

const myKey = {
    kscFocus: 'event.key === "1"',
    kscSpeaker: 'event.key === "2"',
    kscVoiceKontrol: 'event.key === "3"',
};
setBFL(1,1,1.2,"en");
setKeyBFL(myKey);
