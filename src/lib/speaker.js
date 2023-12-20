//Influence of the implementation of accessibility features in the web and the library with extra features
import { I18n } from "i18n-js";
import * as langFiles from "./locales/exportLocales.js";

//function to define a translation
async function loadCustomTranslations(i18n, lang) {
    i18n.store(langFiles[lang]);
    i18n.locale = lang;
    i18n.defaultLocale = 'en';
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
let rowCount = 0;

const i18n = new I18n();
let recognitionIsRun = false;
let dynamicElemets;
let dynamicElemetsLang;
let speakerResult;

let VOLUME = 1;
let RATE = 1;
let PITCH = 1.2;
let LANG = "en";

//function settings
export function setTTS(
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

//function to start the speaker
function startSpeek(text) {
    if (!isPsause && !isRunSpeaker) {
        synth.cancel();
    };
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
    let r = setInterval(() => {
        if (!synth.speaking) {
            clearInterval(r);
        } else {
            synth.pause();
            synth.resume();
        }
    }, 14000);
};

/**
 * 
 * SpeechGlobal
 */
function findAllAttributes() {
    const rows = document.querySelectorAll("[data-speaker]");
    console.log(rows);
    if (rows.length > 0) {
        console.log("Moje délka: " + rows.length);
        startSpeek(rows[rowCount].innerText);

        //switching between elements for speaker
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {   //arrowLeft
                synth.cancel();
                if (rowCount > 0) rowCount--, startSpeek(rows[rowCount].innerText);
                else return;
            } if (event.key === "ArrowRight") { //arrowRight
                synth.cancel();
                console.log("rowCount: " + rowCount)
                if (rowCount < rows.length) rowCount++, console.log(rowCount), startSpeek(rows[rowCount - 1].innerText);
                else return;
            };
        });
    } else synth.cancel(), startSpeek(i18n.t("globalSpeech.textNotFound"));
};

//start speechFocus
document.addEventListener("keydown", (event) => {
    if (event.key === "2") {
        synth.cancel();
        recognition.abort();
        isRunSpeaker = !isRunSpeaker;
        if (isRunSpeaker) startSpeek(i18n.t("globalSpeech.ttsStart")), findAllAttributes();
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
            isRunManual = false;
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
    if (event.key === "1") {
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
    if (event.key === "3" && !recognitionIsRun) {
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
        //console.log(dynamicElemets[currentEl].dataset.elText);
        const elTextLang = "data-el-text-" + LANG;
        dynamicElemetsLang = dynamicElemets[currentEl].getAttribute(elTextLang).toLowerCase();
        //console.log(dynamicElemets[currentEl].getAttribute(elTextLang));
        if (dynamicElemetsLang == null) dynamicElemetsLang = " ";
        if (speakerResult.toLowerCase().includes(dynamicElemets[currentEl].dataset.elText.toLowerCase()) || speakerResult.toLowerCase().includes(dynamicElemetsLang)) {
            if (dynamicElemets[currentEl].dataset.elAction == undefined) dynamicElemets[currentEl].dataset.elAction = "click";
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
    if (event.key === "4") {
        isRunManual = true;
        startSpeek(i18n.t("guide.headline"));
    };
    if (isRunManual) {
        switch (event.key) {
            case "1":
                startSpeek(i18n.t("guide.one"));
                break;
            case "2":
                startSpeek(i18n.t("guide.two"));
                break;
            case "3":
                startSpeek(i18n.t("guide.three"));
                break;
            default:
                break;
        };
    };
});