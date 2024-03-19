//Influence of the implementation of accessibility features in the web and the library with extra features
import { myVariables } from './components/variablesSpeaker';

// Import all localization files
import * as langFiles from "./locales/exportLocales.js";
import { startSpeaker } from './components/globalSpeaker.js';
import { startSpeek, resetSpeaker } from "./components/setupSpeaker.js";
import './components/speaker';
import './components/focusSpeaker';
import './components/globalSpeaker';
import './components/speechToTextSpeaker';
import './components/manualSpeaker.js';

//  Function to setup speaker settings
export function setBFL(
    volume, // From 0 to 1
    rate, // From 0.1 to 10
    pitch, // From 0 to 2
    lang
) {
    // Set myVariables values for volume, rate, pitch, and language
    myVariables.VOLUME = volume;
    myVariables.RATE = rate;
    myVariables.PITCH = pitch;
    myVariables.LANG = lang;

    loadCustomTranslations(myVariables.LANG);
};

//  Function to set key shortcuts
export function setKeyBFL(setObject) {
    if (typeof setObject.kscFocus !== "undefined") { myVariables.KSCFOCUS = setObject.kscFocus };
    if (typeof setObject.kscSpeaker !== "undefined") { myVariables.KSCSPEAKER = setObject.kscSpeaker };
    if (typeof setObject.kscVoiceControl !== "undefined") { myVariables.KSCVOICECONTROL = setObject.kscVoiceControl };
    if (typeof setObject.kscManual !== "undefined") { myVariables.KSCMANUAL = setObject.kscManual };
};

//  Function to load custom translations for the given language
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
    return myVariables.isPsause;
}

export function isPauseBfl() {
    return myVariables.isPsause;
}

export function stopSpeaker() {
    if (myVariables.isRunSpeaker) resetSpeaker(4, 3);
    else if (myVariables.recognitionIsRun && !isFirefox) resetSpeaker(4, 6);
    else if (myVariables.isRunManual) resetSpeaker(4, 5);
    else if (myVariables.isRun) resetSpeaker(4, 1);
}

export function setSpeedOfSpeaker(speed) {
    myVariables.RATE = speed;
}

export function startGlobalSpeaker() {
    if (!myVariables.isRunSpeaker) {
        resetSpeaker(4);
        myVariables.isRunSpeaker = !myVariables.isRunSpeaker;
        myVariables.rowCount = 1;
        startSpeaker();
    }
    return myVariables.isRunSpeaker;
}

export function previousArticle() {
    if (myVariables.isRunSpeaker) { //arrowLeft
        resetSpeaker(4);
        if (myVariables.rowCount === 1) myVariables.errorSound.play();
        else if (myVariables.rowCount > 1) myVariables.rowCount--, startSpeek(myVariables.rowsArray[myVariables.rowCount].innerText);
    }
}

export function hasPrevious() {
    if (myVariables.rowCount === 1) return false;
    else if (myVariables.rowCount > 1) return true;
}

export function hasNext() {
    if (myVariables.rowCount === (myVariables.rowsArray.length - 1)) return false;
    else if (myVariables.rowCount < (myVariables.rowsArray.length - 1)) return true;
}

export function nextArticle() {
    if (myVariables.isRunSpeaker) { //arrowRight
        resetSpeaker(4);
        if (myVariables.rowCount === (myVariables.rowsArray.length - 1)) myVariables.errorSound.play();
        else if (myVariables.rowCount < (myVariables.rowsArray.length - 1)) myVariables.rowCount++, startSpeek(myVariables.rowsArray[myVariables.rowCount].innerText);
    };
}

//  function to add new speechRecognition key
export function addCommand(key, action) {
    myVariables.commandsDatabase[key] = action;
}

//  object to define Speaker component 
export class SpeakerComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <style>
          .flex {
            display: flex;
            justify-content: center;        
          }
          .config-div__content {
            margin-top: 20px;
            background-color: #FFF;
            padding: 16px;
            width: fit-content;
            border-radius: 8px;
            position: fixed;
            top: 8px;
            left: 24px;
          }
        </style>
        <div class="flex config-div__content">
          <input type="range" id="rangeInput" min="0.5" max="2" step="0.1">
          <button id="pauseButton">PAUSE</button>
          <button id="stopButton">STOP</button>
          <button id="previousButton">←</button>
          <button id="nextButton">→</button>
        </div>
      `;

        shadow.getElementById('pauseButton').addEventListener('click', this.handleButtonClickPause.bind(this));
        shadow.getElementById('stopButton').addEventListener('click', this.handleButtonClickStop.bind(this));
        shadow.getElementById('previousButton').addEventListener('click', this.handleButtonClickPrevious.bind(this));
        shadow.getElementById('nextButton').addEventListener('click', this.handleButtonClickNext.bind(this));
        shadow.getElementById('rangeInput').addEventListener('input', this.handleRangeInputChange.bind(this));
    }

    handleButtonClickPause() { pauseButton(); }

    handleButtonClickStop() { stopSpeaker(); }

    handleButtonClickPrevious() { previousArticle(); }

    handleButtonClickNext() { nextArticle(); }

    handleRangeInputChange(event) { setSpeedOfSpeaker(event.target.value); }
};

customElements.define('bfl-speaker', SpeakerComponent);