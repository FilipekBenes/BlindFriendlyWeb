//Vliv implementace prvků přístupnosti do webu a knihovna s nadstandartními funkcemi
import { I18n } from "i18n-js";

//function to define a translation
async function loadTranslations(i18n, lang) {
    const response = await import(`./locales/${lang}.json`);
    const translations = await response.default;
    i18n.store(translations);
    i18n.locale = lang;
    i18n.defaultLocale = 'en';
}

let synth = window.speechSynthesis;
let isRun = false;
let isPsause = false;
let rowCount = 0;

const i18n = new I18n();
let recognitionIsRun = false;
let dynamicElemets;
let speakerResult;

let VOLUME = 1;
let RATE = 1;
let PITCH = 1.2;
let LANG = "en";

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
    loadTranslations(i18n, LANG);
};

function startSpeek(text) {
    if (!isPsause && !isRun) {
        synth.cancel();
    }
    let voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(text);
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang.includes(LANG)) {
            utterThis.voice = voices[i];
        };
    };
    utterThis.volume = VOLUME;
    utterThis.pitch = PITCH;
    utterThis.rate = RATE;
    utterThis.lang = LANG;
    return synth.speak(utterThis);
};


/**
 * 
 * SpeechGlobal
 */
function findAllAttributes() {
    const rows = document.querySelectorAll("[data-speaker]");  // sp = speeking, el = element
    console.log(rows);
    if (rows != null) {
        startSpeek(rows[rowCount].innerText);
        document.addEventListener("keydown", (event) => {
            if (event.which === 37) {   //arrowLeft
                if (rowCount > 0) rowCount--, startSpeek(rows[rowCount].innerText);
                else return;
            } if (event.which === 39) { //arrowRight
                if (rowCount < rows.length) rowCount++, startSpeek(rows[rowCount].innerText);
                else return;
            };
        });
    } else startSpeek(i18n.t("globalSpeech.textNotFound"));
};

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "x") {
        isRun = !isRun;
        if (isRun) startSpeek(i18n.t("globalSpeech.ttsStart")), findAllAttributes();
        else startSpeek(i18n.t("globalSpeech.ttsEnd"));
    };
});

document.addEventListener("keydown", (event) => {
    if (event.which === 32 && isRun) {
        isPsause = !isPsause;
        if (isPsause) synth.pause();
        else synth.resume();
    };
    if (event.which === 27 && isRun) synth.cancel();
});


/**
 * 
 * SpeechFocus
 */
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "i") {
        isRun = !isRun;
        if (isRun) startSpeek(i18n.t("speechFocus.ttsStart"));
        else startSpeek(i18n.t("speechFocus.ttsEnd"));
    };
}, true);

document.addEventListener("focus", (event) => {
    if (!isRun) return;
    startSpeek(event.target.textContent);
}, true);

/**
 * 
 * SpeechToText
 */
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;


let recognition = new SpeechRecognition();
if (SpeechGrammarList) {
    let speechRecognitionList = new SpeechGrammarList();
    recognition.grammars = speechRecognitionList;
}
recognition.continuous = true;
recognition.lang = 'cs-CZ';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

window.addEventListener("load", (event) => {
    dynamicElemets = document.querySelectorAll("[data-el-text]");
});

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "y" && !recognitionIsRun) {
        recognitionIsRun = !recognitionIsRun;
        recognition.start();
        startSpeek(i18n.t("speechToText.sttStart"));
        console.log(i18n.t("speechToText.sttStart"));
    };
});

recognition.onresult = function (event) {
    speakerResult = event.results[0][0].transcript;
    console.log('Result received: ' + speakerResult + '.');
    console.log('Confidence: ' + event.results[0][0].confidence);
    findResult();
    recognition.abort();
    console.log('Speech ended!');
};

recognition.onspeechend = () => {
    recognition.stop();
    console.log("ENDDDDDD");
};

recognition.onnomatch = function (event) {
    console.log("I didn't recognise.");
};

recognition.stop = function (event) {
    recognitionIsRun = false;
    console.log("STOOP  = " + recognitionIsRun);
};

recognition.onerror = function (event) {
    console.log('Chyba ' + event.error);
    recognition.stop();
};

function findResult() {
    for (let i = 0; i < dynamicElemets.length; i++) {
        //console.log(dynamicElemets[i].dataset.elText);
        if (speakerResult.includes(dynamicElemets[i].dataset.elText)) {
            if (dynamicElemets[i].dataset.elAction == undefined) dynamicElemets[i].dataset.elAction = "click";
            console.log("Našli jsme stejný element: " + dynamicElemets[i].dataset.elText);
            startSpeek("Našli jsme stejný element: " + dynamicElemets[i].dataset.elText + ". Chcete na tento element " + dynamicElemets[i].dataset.elAction + "? ANO nebo NE");
            response();
            return;
        } else {
            startSpeek("Nenašli jsme žádný stejný element na této stránce");
            console.log("Nenašli jsme žádný stejný element na této stránce");
        };
    };
}

function response() {
    const eventHandler = (event) => {
        if (event.key === "y") {
            console.log("Akce ANO byla provedena");
            startSpeek("Okey");
            return true;
            callElAction(dynamicElemets[i]);
        } else if (event.key === "n") {
            console.log("Akce NE byla provedena");
            startSpeek("Okey");
        } else {
            //startSpeek("neznámý hlas, zkuste to znovu");
            console.log("neznámý hlas, zkuste to znovu");
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
    }
};

/**
 * 
 * SpeechManual
 */
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "m") {
        startSpeek();
    };
});