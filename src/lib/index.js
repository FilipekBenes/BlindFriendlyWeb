import { myVariables } from './components/variablesSpeaker';
import * as langFiles from "./locales/exportLocales.js";
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