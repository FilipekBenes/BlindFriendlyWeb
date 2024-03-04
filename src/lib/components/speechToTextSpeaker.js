import { myVariables, isFirefox } from "./variablesSpeaker.js";
import { startSpeek } from "./setupSpeaker.js";

/**
 * 
 * SpeechToText
 */
let commandsDatabase = {};
let command = "";
if (!isFirefox) {
    window.addEventListener("load", (event) => {
        myVariables.dynamicElements = document.querySelectorAll("[data-el-text]");

        myVariables.dynamicElements.forEach(element => {
            const text = element.getAttribute('data-el-text').toLowerCase();
            const elTextLang = "data-el-text-" + myVariables.LANG;

            if (element.getAttribute(elTextLang) != null) commandsDatabase[element.getAttribute(elTextLang).toLowerCase()] = element;

            commandsDatabase[text] = element;
        });
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
        myVariables.speakerResult = event.results[0][0].transcript.toLowerCase();

        command = event.results[0][0].transcript.toLowerCase();

        if (commandsDatabase.hasOwnProperty(command)) {
            if (commandsDatabase[command].dataset.elAction == undefined) commandsDatabase[command].dataset.elAction = "click";
            startSpeek(myVariables.i18n.t("speechToText.foundElement", { currentEl: command, elAction: commandsDatabase[command].dataset.elAction }));
            response();
        } else {
            startSpeek(myVariables.i18n.t("speechToText.nothingFound", { currentEl: command }));
        }

        myVariables.recognition.abort();
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

    function response() {
        const eventHandler = (event) => {
            if (event.key === "y") {
                // Akce ANO byla provedena
                startSpeek(myVariables.i18n.t("speechToText.actionYes"));
                callElAction(commandsDatabase[command]);
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
        setTimeout(() => { document.removeEventListener("keydown", eventHandler); }, 15000);
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
};
