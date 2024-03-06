import { myVariables, isFirefox } from "./variablesSpeaker.js";

/**
 * 
 * Speech main function to reset speakers
 */
export function resetSpeaker(...keys) {
    const actions = {
        1: () => myVariables.isRun = false,
        2: () => { if (!isFirefox) myVariables.recognition.abort(); },
        3: () => myVariables.isRunSpeaker = false,
        4: () => myVariables.synth.cancel(),
        5: () => myVariables.isRunManual = false,
        6: () => myVariables.recognitionIsRun = false,
        7: () => myVariables.isPsause = false,
    };

    keys.forEach(key => {
        const action = actions[key];
        if (action) action();
    });
}

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
        } else if (myVariables.recognitionIsRun && !isFirefox) {
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