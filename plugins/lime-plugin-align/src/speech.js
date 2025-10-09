const synth = window.speechSynthesis;

// Function to get voices with retry logic
const getVoices = () => {
    return new Promise((resolve) => {
        if (!synth) {
            resolve([]);
            return;
        }

        let voices = synth.getVoices();
        if (voices.length > 0) {
            resolve(voices);
            return;
        }

        // If no voices loaded yet, wait for them
        const handleVoicesChanged = () => {
            voices = synth.getVoices();
            if (voices.length > 0) {
                synth.removeEventListener("voiceschanged", handleVoicesChanged);
                resolve(voices);
            }
        };

        synth.addEventListener("voiceschanged", handleVoicesChanged);

        // Fallback timeout
        setTimeout(() => {
            synth.removeEventListener("voiceschanged", handleVoicesChanged);
            resolve(synth.getVoices()); // Return whatever we have
        }, 1000);
    });
};

export const speech = async (text, lang) => {
    if (!synth) {
        console.warn("Speech synthesis not supported");
        return;
    }

    try {
        const voices = await getVoices();
        const utterThis = new SpeechSynthesisUtterance(text.toString());

        utterThis.pitch = 0.9;
        utterThis.rate = 1.2;

        // Try to find a voice for the specified language
        let selectedVoice = voices.find(
            (voice) =>
                voice.lang.startsWith(lang) ||
                voice.lang.startsWith(lang.split("-")[0])
        );

        // Fallback to any available voice if no language match
        if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices[0];
        }

        if (selectedVoice) {
            utterThis.voice = selectedVoice;
        }

        // Cancel any ongoing speech and speak new text
        synth.cancel();

        // Return a Promise that resolves when speech finishes
        return new Promise((resolve) => {
            utterThis.onend = () => resolve();
            utterThis.onerror = (error) => {
                console.warn("Speech utterance error:", error);
                resolve(); // Resolve anyway to not break the interval
            };
            synth.speak(utterThis);
        });
    } catch (error) {
        console.warn("Speech synthesis error:", error);
    }
};
