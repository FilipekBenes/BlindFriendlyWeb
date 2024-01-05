import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setBFL, setKeyBFL } from '../../lib/speaker';

const app = createApp(App);
app.use(router);
app.mount('#app');

const myKey = {
    kscFocus: 'event.ctrlKey && event.shiftKey && event.key === "1"',
    kscSpeaker: 'event.ctrlKey && event.shiftKey && event.key === "2"',
    kscVoiceKontrol: 'event.ctrlKey && event.shiftKey && event.key === "3"',
};
setBFL(1,1,1.2,"en");
setKeyBFL(myKey);
