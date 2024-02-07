//Influence of the implementation of accessibility features in the web and the library with extra features
import { I18n } from "i18n-js";
import * as langFiles from "./locales/exportLocales.js";
import { default as importErrorSound } from "./sounds/error.mp3";

//  to define a translation
//  dcsmcc
async function loadCustomTranslations(i18n, lang) {
    if (langFiles[lang] == null) lang = "en";
    i18n.store(langFiles[lang]);
    i18n.locale = lang;
    i18n.defaultLocale = "en";
};

//variables for Speech to text
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
let currentEl = 0;

let recognition = new SpeechRecognition();
if (SpeechGrammarList) {
    let speechRecognitionList = new SpeechGrammarList();
    recognition.grammars = speechRecognitionList;
};
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let synth = window.speechSynthesis;
let isRun = false;
let isRunSpeaker = false;
let isRunManual = false;
let isPsause = false;
let rowCount = 1;
let errorSound = new Audio(importErrorSound);
let rowsArray = [];

const i18n = new I18n();
let recognitionIsRun = false;
let dynamicElemets;
let dynamicElemetsLang;
let speakerResult;

let VOLUME = 1;
let RATE = 1;
let PITCH = 1.2;
let LANG = "en";
let INTERVAL = null;
let KSCFOCUS = 'event.ctrlKey && event.shiftKey && event.key === "1"';
let kscFocus = " CTRL + SHIFT + 1 ";
let KSCSPEAKER = 'event.ctrlKey && event.shiftKey && event.key === "2"';
let kscSpeaker = " CTRL + SHIFT + 2 ";
let KSCVOICECONTROL = 'event.ctrlKey && event.shiftKey && event.key === "3"';
let kscVoiceControl = " CTRL + SHIFT + 3 ";
let KSCMANUAL = 'event.ctrlKey && event.shiftKey && event.key === "4"';

let isInputFocused = false;
document.addEventListener("keydown", (event) => {
    const focusedElement = document.activeElement;
    // Checks whether the input or text field is currently focused
    isInputFocused = focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA';
});

//function settings
export function setBFL(
    volume, // From 0 to 1
    rate, // From 0.1 to 10
    pitch, // From 0 to 2
    lang
) {
    VOLUME = volume;
    RATE = rate;
    PITCH = pitch;
    LANG = lang;

    loadCustomTranslations(i18n, LANG);
};

export function setKeyBFL(setObject) {
    if (typeof setObject.kscFocus !== "undefined") { KSCFOCUS = setObject.kscFocus };
    if (typeof setObject.kscSpeaker !== "undefined") { KSCSPEAKER = setObject.kscSpeaker };
    if (typeof setObject.kscVoiceControl !== "undefined") { KSCVOICECONTROL = setObject.kscVoiceControl };
    if (typeof setObject.kscManual !== "undefined") { KSCMANUAL = setObject.kscManual };
};

//function to start the speaker
function startSpeek(text) {
    if (!isPsause && !isRunSpeaker) {
        synth.cancel();
    };
    clearInterval(INTERVAL);
    let voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text);
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang.includes(LANG)) {
            utterThis.voice = voices[i];
            recognition.lang = voices[i].lang;
        };
    };
    utterThis.volume = VOLUME;
    utterThis.pitch = PITCH;
    utterThis.rate = RATE;
    utterThis.lang = LANG;
    synth.speak(utterThis);

    //long text problem feature pause mid-speech
    INTERVAL = setInterval(() => {
        if (!synth.speaking) {
            clearInterval(INTERVAL);
        } else {
            synth.pause();
            synth.resume();
        }
    }, 14000);

    utterThis.onend = (event) => { clearInterval(INTERVAL) };
};

/**
 * 
 * SpeechGlobal
 */
function findAllAttributes() {
    setTimeout(() => {
        const speakerRows = document.querySelectorAll("[data-speaker]");
        rowsArray = Array.from(speakerRows);
        rowsArray.unshift("START");
        rowsArray.push("END");
        rowCount = 1;
    }, 1000);
};

window.addEventListener('popstate', findAllAttributes);
window.addEventListener('hashchange', findAllAttributes);
document.addEventListener('click', function (e) {
    let clickEl = e.target;
    if (clickEl.tagName === 'A') findAllAttributes();
    else {
        while (clickEl) {
            console.log(clickEl.tagName);
            if (clickEl.tagName === 'A') {
                findAllAttributes();
                break;
            }
            clickEl = clickEl.parentNode;
        }
    }
});
function startSpeaker() {
    findAllAttributes();
    setTimeout(() => {
        if (rowsArray.length > 2) {
            startSpeek(rowsArray[rowCount].innerText);

            //switching between elements for speaker
            document.addEventListener("keydown", (event) => {
                if (event.key === "ArrowLeft" && isRunSpeaker) {   //arrowLeft
                    synth.cancel();
                    if (rowCount === 0) errorSound.play();
                    else if (rowCount > 0) rowCount--, startSpeek(rowsArray[rowCount].innerText);
                } if (event.key === "ArrowRight" && isRunSpeaker) { //arrowRight
                    synth.cancel();
                    if (rowCount === rowsArray.length) errorSound.play();
                    else if (rowCount < (rowsArray.length - 1)) rowCount++, startSpeek(rowsArray[rowCount].innerText);
                };
            });
        } else synth.cancel(), startSpeek(i18n.t("globalSpeech.textNotFound"));
    }, 1000);
};

//start speechGlobal
document.addEventListener("keydown", (event) => {
    if (!isInputFocused && eval(KSCSPEAKER)) {
        synth.cancel();
        recognition.abort();
        isRunSpeaker = !isRunSpeaker;
        if (isRunSpeaker) rowCount = 1, startSpeek(i18n.t("globalSpeech.ttsStart")), startSpeaker();
        else startSpeek(i18n.t("globalSpeech.ttsEnd"));
    };
});

document.addEventListener("keydown", (event) => {
    //key to pause all speakers
    if (event.code === "Space" && !recognitionIsRun) {
        isPsause = !isPsause;
        if (isPsause) synth.pause();
        else synth.resume();
    };

    //key to cancel all speakers
    if (event.key === "Escape") {
        if (isRunSpeaker) {
            synth.cancel();
            isRunSpeaker = false;
        } else if (recognitionIsRun) {
            recognition.abort();
            recognitionIsRun = false;
        } else if (isRunManual) {
            synth.cancel();
            isRunManual = false;
        } else if (isRun) {
            synth.cancel();
            isRun = false;
        };
    };
});

/**
 * 
 * SpeechFocus
 */
document.addEventListener("keydown", (event) => {
    if (!isInputFocused && eval(KSCFOCUS)) {
        synth.cancel();
        recognition.abort();
        isRun = !isRun;
        if (isRun) startSpeek(i18n.t("speechFocus.ttsStart"));
        else startSpeek(i18n.t("speechFocus.ttsEnd"));
    };
}, true);

const fields = [
    ["textContent", "title", "aria-label", "alt", "name"],
    ["labels", "title", "placeholder", "aria-label", "alt"],
    ["aria-label", "textContent", "labels", "title", "placeholder", "alt"]
];

document.addEventListener("focus", (event) => {
    if (!isRun) return;

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
        } else startSpeek(i18n.t("speechFocus.notFound"));
    };
}, true);

/**
 * 
 * SpeechToText
 */
window.addEventListener("load", (event) => {
    dynamicElemets = document.querySelectorAll("[data-el-text]");
});

document.addEventListener("keydown", (event) => {
    if (!isInputFocused && eval(KSCVOICECONTROL) && !recognitionIsRun) {
        synth.cancel();
        recognitionIsRun = !recognitionIsRun;
        startSpeek(i18n.t("speechToText.sttStart"));
        setTimeout(() => {
            recognition.start();
        }, "2000");
        //console.log(i18n.t("speechToText.sttStart"));
    } else if (recognitionIsRun) {
        recognition.abort();
        recognitionIsRun = false;
    };
});

recognition.onresult = function (event) {
    speakerResult = event.results[0][0].transcript;
    console.log('Result received: ' + speakerResult);
    //console.log('Confidence: ' + event.results[0][0].confidence);

    recognition.abort();
    findResult();
};

recognition.onspeechend = () => {
    recognition.stop();
};

recognition.stop = function (event) {
    recognitionIsRun = false;
};

recognition.onerror = function (event) {
    recognition.stop();
};

function findResult() {
    for (currentEl = 0; currentEl < dynamicElemets.length; currentEl++) {
        const elTextLang = "data-el-text-" + LANG;
        if (dynamicElemets[currentEl].getAttribute(elTextLang) == null) dynamicElemetsLang = " ";
        else dynamicElemetsLang = dynamicElemets[currentEl].getAttribute(elTextLang).toLowerCase();

        console.log(dynamicElemets[currentEl].dataset.elAction);

        if (speakerResult.toLowerCase().includes(dynamicElemets[currentEl].dataset.elText.toLowerCase()) || speakerResult.toLowerCase().includes(dynamicElemetsLang)) {
            if (dynamicElemets[currentEl].dataset.elAction == undefined) dynamicElemets[currentEl].dataset.elAction = "click", console.log(dynamicElemets[currentEl].dataset);
            //console.log("Našli jsme stejný element: " + dynamicElemets[currentEl].dataset.elText);
            if (speakerResult.toLowerCase().includes(dynamicElemetsLang)) {
                startSpeek(i18n.t("speechToText.foundElement", { currentEl: dynamicElemetsLang, elAction: dynamicElemets[currentEl].dataset.elAction }));
            } else if (speakerResult.toLowerCase().includes(dynamicElemets[currentEl].dataset.elText.toLowerCase())) {
                startSpeek(i18n.t("speechToText.foundElement", { currentEl: dynamicElemets[currentEl].dataset.elText, elAction: dynamicElemets[currentEl].dataset.elAction }));
            };
            response();
            return;
        } else {
            startSpeek(i18n.t("speechToText.nothingFound"));
            //console.log("Nenašli jsme žádný stejný element na této stránce");
        };
    };
};

function response() {
    const eventHandler = (event) => {
        if (event.key === "y") {
            //console.log("Akce ANO byla provedena");
            startSpeek(i18n.t("speechToText.actionYes"));
            callElAction(dynamicElemets[currentEl]);
        } else if (event.key === "n") {
            //console.log("Akce NE byla provedena");
            startSpeek(i18n.t("speechToText.actionNo"));
        } else {
            //console.log("neznámý hlas, zkuste to znovu");
            startSpeek(i18n.t("speechToText.actionUnknownVoice"));
            response();
        };
    };
    document.addEventListener("keydown", eventHandler, { once: true });
    setTimeout(() => { document.removeEventListener("keydown", eventHandler); console.log("remove"); }, 15000);
};

function callElAction(element) {
    let action = element.dataset.elAction;
    switch (action) {
        case "click":
        case "kliknout":
            element.click();
            break;
        case "type":

            break;
        default:
            break;
    };
};

/**
 * 
 * SpeechManual
 */
document.addEventListener("keydown", (event) => {
    if (eval(KSCMANUAL)) {
        isRunManual = true;
        startSpeek(i18n.t("guide.headline"));
    };
    if (isRunManual) {
        switch (event.key) {
            case "1":
                startSpeek(i18n.t("guide.one", { speakerKey: kscSpeaker }));
                break;
            case "2":
                startSpeek(i18n.t("guide.two", { focusKey: kscFocus }));
                break;
            case "3":
                startSpeek(i18n.t("guide.three", { voiceControlKey: kscVoiceControl }));
                break;
            default:
                break;
        };
    };
});