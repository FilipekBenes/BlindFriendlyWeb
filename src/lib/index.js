import { myVariables } from './components/variablesSpeaker';
import * as langFiles from "./locales/exportLocales.js";
import { startSpeaker } from './components/globalSpeaker.js';
import { startSpeek } from "./components/setupSpeaker.js";
import './components/speaker';
import './components/focusSpeaker';
import './components/globalSpeaker';
import './components/speechToTextSpeaker';
import './components/manualSpeaker.js';

//  function to setup speaker
export function setBFL(
    volume, // From 0 to 1
    rate, // From 0.1 to 10
    pitch, // From 0 to 2
    lang
) {
    myVariables.VOLUME = volume;
    myVariables.RATE = rate;
    myVariables.PITCH = pitch;
    myVariables.LANG = lang;

    loadCustomTranslations(myVariables.LANG);
};

//  function to set the keyShortCuts
export function setKeyBFL(setObject) {
    if (typeof setObject.kscFocus !== "undefined") { myVariables.KSCFOCUS = setObject.kscFocus };
    if (typeof setObject.kscSpeaker !== "undefined") { myVariables.KSCSPEAKER = setObject.kscSpeaker };
    if (typeof setObject.kscVoiceControl !== "undefined") { myVariables.KSCVOICECONTROL = setObject.kscVoiceControl };
    if (typeof setObject.kscManual !== "undefined") { myVariables.KSCMANUAL = setObject.kscManual };
};

//  to define a translation
async function loadCustomTranslations(lang) {
    if (langFiles[lang] == null) lang = "en";
    myVariables.i18n.store(langFiles[lang]);
    myVariables.i18n.locale = lang;
    myVariables.i18n.defaultLocale = "en";
};

export function pauseButton() {
    if (!myVariables.recognitionIsRun) {
        myVariables.isPsause = !myVariables.isPsause;
        if (myVariables.isPsause) myVariables.synth.pause();
        else myVariables.synth.resume();
    };
}

export function stopSpeaker() {
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
}

export function setSpeedOfSpeaker(speed) {
    myVariables.RATE = speed;
}

export function startGlobalSpeaker() {
    if (!myVariables.isRunSpeaker) {
        myVariables.synth.cancel();
        myVariables.isRunSpeaker = !myVariables.isRunSpeaker;
        myVariables.rowCount = 1;
        startSpeaker();
    }
    return myVariables.isRunSpeaker;
}

export function previousArticle() {
    if (myVariables.isRunSpeaker) {   //arrowLeft
        myVariables.synth.cancel();
        if (myVariables.rowCount === 0) myVariables.errorSound.play();
        else if (myVariables.rowCount > 0) myVariables.rowCount--, startSpeek(myVariables.rowsArray[myVariables.rowCount].innerText);
    }
}

export function nextArticle() {
    if (myVariables.isRunSpeaker) { //arrowRight
        myVariables.synth.cancel();
        if (myVariables.rowCount === (myVariables.rowsArray.length - 1)) myVariables.errorSound.play();
        else if (myVariables.rowCount < (myVariables.rowsArray.length - 1)) myVariables.rowCount++, startSpeek(myVariables.rowsArray[myVariables.rowCount].innerText);
    };
}

export function addCommand(key, action) {
    // Přidání nového klíče a akce do objektu commandsDatabase
    myVariables.commandsDatabase[key] = action;
}