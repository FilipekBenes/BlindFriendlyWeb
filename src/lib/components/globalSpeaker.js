import { myVariables } from "./variablesSpeaker.js";
import { startSpeek, resetSpeaker } from "./setupSpeaker.js";

/**
 * 
 * SpeechGlobal
 */

//start speechGlobal
document.addEventListener("keydown", (event) => {
    if (!myVariables.isInputFocused && eval(myVariables.KSCSPEAKER)) {
        resetSpeaker(2, 4);
        myVariables.isRunSpeaker = !myVariables.isRunSpeaker;
        if (myVariables.isRunSpeaker) myVariables.rowCount = 1, startSpeek(myVariables.i18n.t("globalSpeech.ttsStart")), startSpeaker();
        else startSpeek(myVariables.i18n.t("globalSpeech.ttsEnd"));
    };
});

function findAllAttributes() {
    setTimeout(() => {
        const speakerRows = document.querySelectorAll("[data-speaker]");
        myVariables.rowsArray = Array.from(speakerRows);
        myVariables.rowsArray.unshift("START");
        myVariables.rowsArray.push("END");
        myVariables.rowCount = 1;
    }, 1000);
};

window.addEventListener('popstate', findAllAttributes);
window.addEventListener('hashchange', findAllAttributes);
document.addEventListener('click', function (e) {
    let clickEl = e.target;
    if (clickEl.tagName === 'A') findAllAttributes();
    else {
        while (clickEl) {
            if (clickEl.tagName === 'A') {
                findAllAttributes();
                break;
            }
            clickEl = clickEl.parentNode;
        }
    }
});
export function startSpeaker() {
    findAllAttributes();
    setTimeout(() => {
        if (myVariables.rowsArray.length > 2) {
            startSpeek(myVariables.rowsArray[myVariables.rowCount].innerText);

            //switching between elements for speaker
            document.addEventListener("keydown", (event) => {
                if (event.key === "ArrowLeft" && myVariables.isRunSpeaker) {   //arrowLeft
                    myVariables.synth.cancel();
                    if (myVariables.rowCount === 0) myVariables.errorSound.play();
                    else if (myVariables.rowCount > 0) myVariables.rowCount--, startSpeek(myVariables.rowsArray[myVariables.rowCount].innerText);
                } if (event.key === "ArrowRight" && myVariables.isRunSpeaker) { //arrowRight
                    myVariables.synth.cancel();
                    if (myVariables.rowCount === (myVariables.rowsArray.length - 1)) myVariables.errorSound.play();
                    else if (myVariables.rowCount < (myVariables.rowsArray.length - 1)) myVariables.rowCount++, startSpeek(myVariables.rowsArray[myVariables.rowCount].innerText);
                };
            });
        } else myVariables.synth.cancel(), startSpeek(myVariables.i18n.t("globalSpeech.textNotFound"));
    }, 1000);
};
