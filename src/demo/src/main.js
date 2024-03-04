import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setBFL, setKeyBFL, pauseButton } from '../../lib/index';

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
