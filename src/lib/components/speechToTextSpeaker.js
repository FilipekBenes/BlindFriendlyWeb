import { myVariables, isFirefox } from "./variablesSpeaker.js";
import { startSpeek, resetSpeaker } from "./setupSpeaker.js";

/**
 * 
 * SpeechToText
 */
let command = "";
if (!isFirefox) {
    // Add event listener to the window load event
    window.addEventListener("load", (event) => {
        myVariables.dynamicElements = document.querySelectorAll("[data-el-text]");

        myVariables.dynamicElements.forEach(element => {
            const text = element.getAttribute('data-el-text').toLowerCase();
            const elTextLang = "data-el-text-" + myVariables.LANG;

            if (element.getAttribute(elTextLang) != null) myVariables.commandsDatabase[element.getAttribute(elTextLang).toLowerCase()] = element;

            myVariables.commandsDatabase[text] = element;
        });
    });

    document.addEventListener("keydown", (event) => {
        if (!myVariables.isInputFocused && eval(myVariables.KSCVOICECONTROL) && !myVariables.recognitionIsRun) {
            resetSpeaker(4);
            myVariables.recognitionIsRun = !myVariables.recognitionIsRun;

            startSpeek(myVariables.i18n.t("speechToText.sttStart"));

            setTimeout(() => {
                myVariables.recognition.start();
            }, "2000");
        } else if (myVariables.recognitionIsRun) {
            resetSpeaker(4, 6);
        };
    });

    // Add event listener to the recognition onresult event
    myVariables.recognition.onresult = function (event) {
        myVariables.speakerResult = event.results[0][0].transcript.toLowerCase();
        command = event.results[0][0].transcript.toLowerCase();

        // Check if the commandsDatabase has the command as a property
        if (myVariables.commandsDatabase.hasOwnProperty(command)) {
            const commandValue = myVariables.commandsDatabase[command];

            if (typeof commandValue === 'object' && commandValue.dataset) {
                if (commandValue.dataset.elAction == undefined) commandValue.dataset.elAction = "click";
                startSpeek(myVariables.i18n.t("speechToText.foundElement", { currentEl: command, elAction: commandValue.dataset.elAction }));
                response();
            } else if (typeof commandValue === 'function') {
                startSpeek(myVariables.i18n.t("speechToText.foundMethod", { currentMethod: command }));
                commandValue();
            }
        } else startSpeek(myVariables.i18n.t("speechToText.nothingFound", { currentEl: command }));

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
                callElAction(myVariables.commandsDatabase[command]);
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
