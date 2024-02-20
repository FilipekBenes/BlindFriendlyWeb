//Influence of the implementation of accessibility features in the web and the library with extra features
import { myVariables, isFirefox } from "./variablesSpeaker.js";

export function resetSpeaker() {
    switch (event.key) {
        case "1":
            startSpeek(myVariables.i18n.t("guide.one", { speakerKey: myVariables.kscSpeaker }));
            break;
        case "2":
            startSpeek(myVariables.i18n.t("guide.two", { focusKey: myVariables.kscFocus }));
            break;
        case "3":
            startSpeek(myVariables.i18n.t("guide.three", { voiceControlKey: myVariables.kscVoiceControl }));
            break;
        default:
            break;
    };
    myVariables.synth.cancel();
    if (!isFirefox) {
        myVariables.recognition.abort();
    }
    myVariables.isRun = false;
    myVariables.isRunSpeaker = false;
    myVariables.isRunManual = false;
    myVariables.isRun = false;
    myVariables.isPsause = false;
    myVariables.recognitionIsRun = false;
};

document.addEventListener("keydown", (event) => {
    const focusedElement = document.activeElement;
    // Checks whether the input or text field is currently focused
    myVariables.isInputFocused = focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA';
});

/**
 * 
 * Speech main function to pause and stop speaker
 */

document.addEventListener("keydown", (event) => {
    //key to pause all speakers
    if (event.code === "Space" && !myVariables.recognitionIsRun) {
        myVariables.isPsause = !myVariables.isPsause;
        if (myVariables.isPsause) myVariables.synth.pause();
        else myVariables.synth.resume();
    };

    //key to cancel all speakers
    if (event.key === "Escape") {
        if (myVariables.isRunSpeaker) {
            myVariables.synth.cancel();
            myVariables.isRunSpeaker = false;
        } else if (myVariables.recognitionIsRun && !isFirefox) {
            myVariables.recognition.abort();
            myVariables.recognitionIsRun = false;
        } else if (myVariables.isRunManual) {
            myVariables.synth.cancel();
            myVariables.isRunManual = false;
        } else if (myVariables.isRun) {
            myVariables.synth.cancel();
            myVariables.isRun = false;
        };
    };
});