/**
 * Represents the data which will be bound to elements in the view.
 *
 * @type {{remaining: Binding, speed: Binding, typos: Binding, sentence: Binding, typing: Binding}}
 */
const elements = {
    remaining: Binding.create(60, "remaining"),
    speed: Binding.create(0, "speed"),
    typos: Binding.create(0, "typos"),
    sentence: Binding.create("The quick brown fox jumped over the lazy dog.", "sentence"),
    typing: Binding.create("", "typing"),
    stats: Binding.create("", "report-stats"),

    report: document.getElementById("report"),
    closeReport: document.getElementById("report-close")
};

/**
 * Represents the the data used to run the exam.
 *
 * @type {{started: boolean, words: number, current: number, currentWord: number, typedWord: string, typoIndexes: Array}}
 */
const data = {
    lastKey: ' ',
    started: false,
    words: 0,
    current: 0,
    currentWord: 0,
    typedWord: "",
    typoIndexes: []
};

/**
 * View callbacks which run the exam.
 *
 * @type {{start: function(), type: function(*), reportClose: function()}}
 */
const callbacks = {
    start: () => {
        if(!data.started) {
            data.started = true;

            highlight();

            const task = setInterval(() => {
                if(--elements.remaining.value === 0) {
                    clearInterval(task);

                    data.started = false;

                    elements.remaining.value = 60;
                    elements.sentence.value = sentences[0];
                    elements.typing.value = "";
                    elements.typing.target.disabled = true;

                    elements.report.classList.add("is-active");
                    elements.stats.value = elements.speed.value + " wpm with " + elements.typos.value + " typos.";
                    elements.closeReport.onclick = callbacks.reportClose;

                    elements.speed.value = 0;
                    elements.typos.value = 0;

                    data.words = 0;
                    data.current = 0;
                    data.currentWord = 0;
                    data.typedWord = "";
                    data.typoIndexes = [];

                } else {
                    elements.speed.value = Math.round((data.words- elements.typos.value) * 60 / (60 - elements.remaining.value))
                }

            }, 1000)

        }

    },

    type: event => {
        if(event.key === ' ') {
            if(data.lastKey !== ' ') {
                const words = sentences[data.current].split(" ");

                if(words[data.currentWord] !== data.typedWord) {
                    data.typoIndexes.push(data.currentWord);
                    elements.typos.value++;
                }

                data.words++;
                data.typedWord = "";

                if(++data.currentWord === words.length) {
                    changeSentence();

                    data.typoIndexes = [];
                    data.currentWord = 0;
                    data.typedWord = "";
                }

            }

        } else {
            if(data.typedWord.length === 0) {
                highlight();
            }

            data.typedWord = data.typedWord.concat(event.key);
        }

        data.lastKey = event.key;
    },

    reportClose: () => {
        elements.report.classList.remove("is-active");

        elements.typing.target.disabled = false;
    }
};

/**
 * Highlights the current word being typed in the exam.
 */
function highlight() {
    const words = sentences[data.current].split(" ");

    words.forEach((value, index) => {
        if(data.typoIndexes.includes(index)) {
            words[index] = "<a class=\"sentence-error\">" + words[index] + "</a> "
        }

    });

    // Insecure, need to find a work around.
    elements.sentence.target.innerHTML = words.slice(0, data.currentWord).join(" ") + " <a class=\"type-prompt\">" + words[data.currentWord] + "</a> " + words.slice(data.currentWord + 1, words.length).join(" ");
}

/**
 * Changes the sentence to different one randomly.
 *
 * @returns {number}
 */
function changeSentence() {
    const possible =  Math.floor(Math.random() * (Math.floor(sentences.length -1)));

    data.current = possible !== data.current ? possible : changeSentence();
    elements.sentence.value = sentences[possible];
    elements.typing.value = "";

    return possible;
}

elements.typing.target.onkeydown = callbacks.start;
elements.typing.target.onkeypress = callbacks.type;
