import { myVariables, isFirefox } from "./variablesSpeaker.js";
import { startSpeek } from "./setupSpeaker.js";

/**
 * 
 * SpeechFocus
 */

const fields = [
    ["textContent", "title", "aria-label", "alt", "name"],
    ["labels", "title", "placeholder", "aria-label", "alt"],
    ["aria-label", "textContent", "labels", "title", "placeholder", "alt"]
];

document.addEventListener("keydown", (event) => {
    if (!myVariables.isInputFocused && eval(myVariables.KSCFOCUS)) {
        //resetSpeaker();
        myVariables.synth.cancel();
        if (!isFirefox) {
            myVariables.recognition.abort();
        }
        myVariables.isRun = !myVariables.isRun;
        if (myVariables.isRun) startSpeek(myVariables.i18n.t("speechFocus.ttsStart"));
        else startSpeek(myVariables.i18n.t("speechFocus.ttsEnd"));
    };
}, true);

document.addEventListener("focus", (event) => {
    if (!myVariables.isRun) return;

    const focusEl = event.target;
    let newField = [];

    switch (focusEl.nodeName) { //BUTTON, A, SUMMARY, INPUT
        case "A":
        case "BUTTON":
        case "SUMMARY":
            newField = fields[0];
            break;
        case "INPUT":
            newField = fields[1];
            break;
        default:
            newField = fields[1];
            break;
    };

    for (let i = 0; i < newField.length; i++) {
        const attribute = newField[i];
        if (attribute === "labels" && focusEl.labels?.length > 0) {
            if (focusEl.labels[0].textContent == "") continue;
            startSpeek(focusEl.labels[0].textContent);
            return;
        } else if (attribute === "textContent" && focusEl.textContent != "") {
            startSpeek(focusEl.textContent);
            return;
        } else if (focusEl.getAttribute(attribute) != null) {
            startSpeek(focusEl.getAttribute(attribute));
            return;
        };
    };

    for (let i = 0; i < newField.length; i++) {
        const attribute = newField[i];
        if (focusEl.querySelector("[" + attribute + "]") != null) {
            startSpeek(focusEl.querySelector("[" + attribute + "]").getAttribute(attribute));
            return;
        } else startSpeek(myVariables.i18n.t("speechFocus.notFound"));
    };
}, true);