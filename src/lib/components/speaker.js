import { myVariables, isFirefox } from "./variablesSpeaker.js";

/**
 * 
 * Speech main function to reset speakers
 */
export function resetSpeaker(...keys) {
    keys.forEach(key => {
        switch (key) {
            case 1:
                myVariables.isRun = false;
                console.log("1");
                break;
            case 2:
                if (!isFirefox) {
                    myVariables.recognition.abort();
                }
                break;
            case 3:
                myVariables.isRunSpeaker = false;
                break;
            case 4:
                myVariables.synth.cancel();
                console.log("4");
                break;
            case 5:
                myVariables.isRunManual = false;
                console.log("5");
                break;
            case 6:
                myVariables.recognitionIsRun = false;
                break;
            default:
                break;
        };
    });
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