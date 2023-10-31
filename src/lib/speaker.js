let synth = window.speechSynthesis;
let isRun = false;
let isPsause = false;
let rowCount = 0;

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
    const rows = document.querySelectorAll("[sp-el]");  // sp = speeking, el = element
    console.log(rows);
    if (rows != null) {
        startSpeek(rows[rowCount].innerText);
        document.addEventListener("keydown", (event) => {
            if (event.which === 37) {   //arrowLeft
                if (rowCount > 0) {
                    rowCount--;
                    startSpeek(rows[rowCount].innerText);
                } else return;
            } if (event.which === 39) { //arrowRight
                if (rowCount < rows.length) {
                    rowCount++;
                    startSpeek(rows[rowCount].innerText);
                } else return;
            };
        });
    } else {
        startSpeek("Nenachází se zde žádný text k přečtení")
    };
};

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "x") {
        isRun = !isRun;
        if (isRun) {
            startSpeek("TTS řečník byl zapnut");
            findAllAttributes();
        } else {
            startSpeek("TTS řečník byl vypnut");
        };
    };
});

document.addEventListener("keydown", (event) => {
    if (event.which === 32 && isRun) {
        isPsause = !isPsause;
        if (isPsause) synth.pause();
        else synth.resume();
    };
    if (event.which === 27 && isRun) {
        synth.cancel();
    };
});


/**
 * 
 * SpeechFocus
 */
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "i") {
        isRun = !isRun;
        if (isRun) startSpeek("TTS navigace byla zapnuta");
        else startSpeek("TTS navigace byla vypnuta");
    };
});

document.addEventListener("focus", (event) => {
    if (!isRun) return;
    startSpeek(event.target.textContent);
}, true);
