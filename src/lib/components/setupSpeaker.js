import { myVariables, isFirefox } from "./variablesSpeaker.js";

//  function to start the speaker
export function startSpeek(text) {
    if (!myVariables.isPsause && !myVariables.isRunSpeaker) {
        myVariables.synth.cancel();
    };
    clearInterval(myVariables.INTERVAL);
    let voices = myVariables.synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text);
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang.includes(myVariables.LANG)) {
            utterThis.voice = voices[i];
            if (!isFirefox) {
                myVariables.recognition.lang = voices[i].lang;
            }
        };
    };
    utterThis.volume = myVariables.VOLUME;
    utterThis.pitch = myVariables.PITCH;
    utterThis.rate = myVariables.RATE;
    utterThis.lang = myVariables.LANG;
    myVariables.synth.speak(utterThis);

    //  long text problem feature pause mid-speech
    myVariables.INTERVAL = setInterval(() => {
        if (!myVariables.synth.speaking) {
            clearInterval(myVariables.INTERVAL);
        } else {
            myVariables.synth.pause();
            myVariables.synth.resume();
        }
    }, 14000);

    utterThis.onend = (event) => { clearInterval(myVariables.INTERVAL) };
};
