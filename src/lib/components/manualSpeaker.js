import { myVariables } from "./variablesSpeaker.js";
import { startSpeek } from "./setupSpeaker.js";

/**
 * 
 * SpeechManual
 */
document.addEventListener("keydown", (event) => {
    if (!myVariables.isInputFocused && eval(myVariables.KSCMANUAL)) {
        myVariables.isRunManual = true;
        startSpeek(myVariables.i18n.t("guide.headline"));
    };
    if (myVariables.isRunManual) {
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
    };
});