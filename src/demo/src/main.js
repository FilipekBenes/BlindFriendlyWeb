import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setBFL, setKeyBFL } from '../../lib/speaker';

const app = createApp(App);
app.use(router);
app.mount('#app');

const myKey = {
    kscFocus: 'event.key === "0"',
    kscSpeaker: 'event.key === "9"',
    kscVoiceControl: 'event.key === "8"',
    kscManual: 'event.key === "7"',
};
setBFL(1,1,1.2,"cs");
setKeyBFL(myKey);
