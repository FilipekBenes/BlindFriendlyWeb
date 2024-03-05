import { I18n } from "i18n-js";
import { default as importErrorSound } from "../sounds/error.mp3";

// Check if the browser is Firefox
export const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

// Initialize the SpeechRecognition object
let recognition;
if (isFirefox) {
    recognition = "";
} else {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
}

// Define the global variables for the application
export const myVariables = {
    // Variables for Speech to text
    SpeechGrammarList: window.SpeechGrammarList || window.webkitSpeechGrammarList,
    recognition: recognition,
    synth: window.speechSynthesis,
    errorSound: new Audio(importErrorSound),
    commandsDatabase: {},

    i18n: new I18n(),

    // Volume, rate, and pitch settings
    VOLUME: 1,
    RATE: 1,
    PITCH: 1.2,

    // Language settings
    LANG: "en",

    // Interval and event listeners
    INTERVAL: null,
    KSCFOCUS: 'event.ctrlKey && event.shiftKey && event.key === "1"',
    kscFocus: "0",
    KSCSPEAKER: 'event.ctrlKey && event.shiftKey && event.key === "2"',
    kscSpeaker: "9",
    KSCVOICECONTROL: 'event.ctrlKey && event.shiftKey && event.key === "3"',
    kscVoiceControl: "8",
    KSCMANUAL: 'event.ctrlKey && event.shiftKey && event.key === "4"',

    isRun: false,
    isRunSpeaker: false,
    isRunManual: false,
    isInputFocused: false,
    isPsause: false,
    recognitionIsRun: false,

    currentEl: 0,
    rowCount: 1,
    rowsArray: [],
    dynamicElements: null,
    dynamicElementsLang: null,
    speakerResult: null,
};

if (!isFirefox) {
    //  Define the recognition settings
    myVariables.recognition.continuous = true; // Enable continuous recognition
    myVariables.recognition.interimResults = false; // Disable interim results
    myVariables.recognition.maxAlternatives = 1; // Set maximum alternatives to 1
}

if (myVariables.SpeechGrammarList) {
    let speechRecognitionList = new myVariables.SpeechGrammarList();
    myVariables.recognition.grammars = speechRecognitionList;
};