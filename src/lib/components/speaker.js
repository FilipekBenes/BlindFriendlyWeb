import { myVariables, isFirefox } from "./variablesSpeaker.js";
import { resetSpeaker } from "./setupSpeaker.js";

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
        if (myVariables.isRunSpeaker) resetSpeaker(4, 3);
        else if (myVariables.recognitionIsRun && !isFirefox) resetSpeaker(2, 6);
        else if (myVariables.isRunManual) resetSpeaker(4, 5);
        else if (myVariables.isRun) resetSpeaker(4, 1);
    };
});