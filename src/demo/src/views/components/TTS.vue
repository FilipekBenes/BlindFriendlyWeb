<template>
    <div>
        <div>
            <label>Spoken Text</label>
            <input v-model="text" type="text">

            <br>
            <label>Language</label>
            <div>
                <select v-model="voice">
                    <option disabled>
                        Select Language
                    </option>
                    <option v-for="(voice, i) in voices" :key="i" :value="voice">
                        {{ `${voice.name} (${voice.lang})` }}
                    </option>
                </select>
            </div>

            <br>
            <div inline-flex items-center>
                <label class="font-bold mr-2">Pitch</label>
                <div class="mt-1" inline-flex>
                    <input v-model="pitch" type="range" min="0.5" max="2" step="0.1">
                </div>
            </div>

            <br>
            <div inline-flex items-center>
                <label class="font-bold mr-3">Rate</label>
                <div class="mt-1" inline-flex>
                    <input v-model="rate" type="range" min="0.5" max="2" step="0.1">
                </div>
            </div>

            <div class="mt-2">
                <button :disabled="speech.isPlaying.value" @click="play">
                    {{ speech.status.value === 'pause' ? 'Resume' : 'Speak' }}
                </button>
                <button :disabled="!speech.isPlaying.value" class="orange" @click="pause">
                    Pause
                </button>
                <button :disabled="!speech.isPlaying.value" class="red" @click="stop">
                    Stop
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSpeechSynthesis } from '@vueuse/core'

const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
const text = ref('Hello, everyone! Good morning!')
const pitch = ref(1)
const rate = ref(1)

const speech = useSpeechSynthesis(text, {
    voice,
    pitch,
    rate,
})

let synth: SpeechSynthesis

const voices = ref<SpeechSynthesisVoice[]>([])

onMounted(() => {
    if (speech.isSupported.value) {
        // load at last
        setTimeout(() => {
            synth = window.speechSynthesis
            voices.value = synth.getVoices()
            voice.value = voices.value[0]
        })
    }
})

function play() {
    if (speech.status.value === 'pause') {
        console.log('resume')
        window.speechSynthesis.resume()
    }
    else {
        speech.speak()
    }
}

function pause() {
    window.speechSynthesis.pause()
}

function stop() {
    speech.stop()
}
</script>