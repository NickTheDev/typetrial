/**
 * Represents the the data used store the exam state.
 *
 * @type {{timer: number, started: boolean, chars: number, typoChars: number, current: number, currentWord: number, typedKey: string, typedWord: string, typoIndexes: Array}}
 */
const data = {
    timer: 120,
    started: false,
    chars: 0,
    typoChars: 0,
    current: 0,
    currentWord: 0,
    typedKey: " ",
    typedWord: "",
    typoIndexes: []
};

/**
 * Represents the data which will be bound to elements in the view.
 *
 * @type {{remaining: Binding, speed: Binding, typos: Binding, sentence: Binding, typing: Binding, stats: Binding, report: HTMLElement | null, closeReport: HTMLElement | null}}
 */
const elements = {
    remaining: Binding.of("remaining", data.timer),
    remainingMobile: Binding.of("remaining-mobile", data.timer),
    speed: Binding.of("speed", 0),
    typos: Binding.of("typos", 0),
    sentence: Binding.of("sentence", "The quick brown fox jumped over the lazy dog."),
    typing: Binding.of("typing"),
    stats: Binding.of("report-stats"),

    report: document.getElementById("report"),
    closeReport: document.getElementById("report-close")
};

/**
 * View callbacks which run the exam.
 *
 * @type {{start: function(), type: function(*), exitReport: function()}}
 */
const callbacks = {

    /**
     * Starts the exam when the input box is first typed in.
     */
    start() {
        if(!data.started) {
            data.started = true;

            utils.highlight();

            const task = setInterval(() => {
                elements.remainingMobile.value--;

                if(--elements.remaining.value === 0) {
                    clearInterval(task);

                    data.started = false;
                    data.current = 0;
                    data.currentWord = 0;
                    data.typedWord = "";
                    data.typoIndexes = [];

                    elements.sentence.value = sentences[0];
                    elements.typing.value = "";
                    elements.typing.target.disabled = true;

                    elements.report.classList.add("is-active");
                    elements.stats.value = elements.speed.value + " wpm with " + elements.typos.value + " typos, " + (100 - Math.round(data.typoChars * 100 / data.chars)) + "% accuracy.";
                    elements.closeReport.onclick = callbacks.exitReport;

                    data.chars = 0;
                    data.typoChars = 0;

                    elements.remaining.value = data.timer;
                    elements.remainingMobile.value = data.timer;
                    elements.speed.value = 0;
                    elements.typos.value = 0;

                } else {
                    elements.speed.value = Math.round((((data.chars - data.typoChars) / 5) * data.timer) / (data.timer - elements.remaining.value));
                }

            }, 1000)

        }

    },

    /**
     * Updates the exam as a character is typed.
     *
     * @param {KeyboardEvent} event Type event.
     */
    type(event) {
        if(event.key === " ") {
            if(data.typedKey !== " ") {
                const words = sentences[data.current].split(" ");

                if(words[data.currentWord] !== data.typedWord) {
                    data.typoIndexes.push(data.currentWord);
                    data.typoChars += data.typedWord.length;
                    elements.typos.value++;
                }

                data.typedWord = "";

                if(++data.currentWord === words.length) {
                    utils.changeSentence();

                    data.typoIndexes = [];
                    data.currentWord = 0;
                    data.typedWord = "";
                }

            }

        } else {
            if(data.typedWord.length === 0) {
                utils.highlight();
            }

            data.chars++;
            data.typedWord = data.typedWord.concat(event.key);
        }

        data.typedKey = event.key;
    },

    /**
     * Exits the report modal.
     */
    exitReport() {
        elements.report.classList.remove("is-active");
        elements.typing.target.disabled = false;
    }

};

/**
 * Utils used to operate on the exam view.
 *
 * @type {{highlight: function(), changeSentence: function()}}
 */
const utils = {

    /**
     * Highlights the current word being typed in the exam.
     */
    highlight() {
        const words = sentences[data.current].split(" ");

        words.forEach((value, index) => {
            if(data.typoIndexes.includes(index)) {
                words[index] = "<a class=\"sentence-error\">" + words[index] + "</a> "
            }

        });

        // Insecure, need to find a work around.
        elements.sentence.target.innerHTML = words.slice(0, data.currentWord).join(" ") + " <a class=\"sentence-prompt\">" + words[data.currentWord] + "</a> " + words.slice(data.currentWord + 1, words.length).join(" ");
    },

    /**
     * Changes the sentence to different one randomly.
     *
     * @returns {number} Sentence index.
     */
    changeSentence() {
        const possible =  Math.floor(Math.random() * (Math.floor(sentences.length - 1)));

        data.current = possible !== data.current ? possible : utils.changeSentence();
        elements.sentence.value = sentences[possible];
        elements.typing.value = "";

        return possible;
    }

};

document.addEventListener("DOMContentLoaded", () => {
    elements.typing.target.onkeydown = callbacks.start;
    elements.typing.target.onkeypress = callbacks.type;
});