import { myVariables } from "./variablesSpeaker.js";
import { startSpeek } from "./setupSpeaker.js";

/**
 * 
 * SpeechToText
 */

window.addEventListener("load", (event) => {
    myVariables.dynamicElemets = document.querySelectorAll("[data-el-text]");
});

document.addEventListener("keydown", (event) => {
    if (!myVariables.isInputFocused && eval(myVariables.KSCVOICECONTROL) && !myVariables.recognitionIsRun) {
        myVariables.synth.cancel();
        myVariables.recognitionIsRun = !myVariables.recognitionIsRun;
        startSpeek(myVariables.i18n.t("speechToText.sttStart"));                                                           
        setTimeout(() => {
            myVariables.recognition.start();
        }, "2000");
    } else if (myVariables.recognitionIsRun) {
        myVariables.recognition.abort();
        myVariables.recognitionIsRun = false;
    };
});

myVariables.recognition.onresult = function (event) {
    myVariables.speakerResult = event.results[0][0].transcript;
    //console.log('Result received: ' + myVariables.speakerResult);
    //console.log('Confidence: ' + event.results[0][0].confidence);

    myVariables.recognition.abort();
    findResult();
};

myVariables.recognition.onspeechend = () => {
    myVariables.recognition.stop();
};

myVariables.recognition.stop = function (event) {
    myVariables.recognitionIsRun = false;
};

myVariables.recognition.onerror = function (event) {
    myVariables.recognition.stop();
};

function findResult() {
    for (myVariables.currentEl = 0; myVariables.currentEl < myVariables.dynamicElemets.length; myVariables.currentEl++) {
        const elTextLang = "data-el-text-" + myVariables.LANG;
        if (myVariables.dynamicElemets[myVariables.currentEl].getAttribute(elTextLang) == null) myVariables.dynamicElemetsLang = " ";
        else myVariables.dynamicElemetsLang = myVariables.dynamicElemets[myVariables.currentEl].getAttribute(elTextLang).toLowerCase();

        //console.log(myVariables.dynamicElemets[myVariables.currentEl].dataset.elAction);

        if (myVariables.speakerResult.toLowerCase().includes(myVariables.dynamicElemets[myVariables.currentEl].dataset.elText.toLowerCase()) || myVariables.speakerResult.toLowerCase().includes(myVariables.dynamicElemetsLang)) {
            if (myVariables.dynamicElemets[myVariables.currentEl].dataset.elAction == undefined) myVariables.dynamicElemets[myVariables.currentEl].dataset.elAction = "click";
            //console.log("Našli jsme stejný element: " + myVariables.dynamicElemets[myVariables.currentEl].dataset.elText);
            if (myVariables.speakerResult.toLowerCase().includes(myVariables.dynamicElemetsLang)) {
                startSpeek(myVariables.i18n.t("speechToText.foundElement", { currentEl: myVariables.dynamicElemetsLang, elAction: myVariables.dynamicElemets[myVariables.currentEl].dataset.elAction }));
            } else if (myVariables.speakerResult.toLowerCase().includes(myVariables.dynamicElemets[myVariables.currentEl].dataset.elText.toLowerCase())) {
                startSpeek(myVariables.i18n.t("speechToText.foundElement", { currentEl: myVariables.dynamicElemets[myVariables.currentEl].dataset.elText, elAction: myVariables.dynamicElemets[myVariables.currentEl].dataset.elAction }));
            };
            response();
            return;
        } else {
            startSpeek(myVariables.i18n.t("speechToText.nothingFound"));
        };
    };
};

function response() {
    const eventHandler = (event) => {
        if (event.key === "y") {
            // Akce ANO byla provedena
            startSpeek(myVariables.i18n.t("speechToText.actionYes"));
            callElAction(myVariables.dynamicElemets[myVariables.currentEl]);
        } else if (event.key === "n") {
            // Akce NE byla provedena
            startSpeek(myVariables.i18n.t("speechToText.actionNo"));
        } else {
            // neznámý hlas, zkuste to znovu
            startSpeek(myVariables.i18n.t("speechToText.actionUnknownVoice"));
            response();
        };
    };
    document.addEventListener("keydown", eventHandler, { once: true });
    setTimeout(() => { document.removeEventListener("keydown", eventHandler);}, 15000);
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
