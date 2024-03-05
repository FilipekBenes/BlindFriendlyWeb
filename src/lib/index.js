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
}