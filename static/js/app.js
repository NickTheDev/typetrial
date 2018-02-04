/**
 * Represents the data which will be bound to elements in the view.
 *
 * @type {{remaining: Binding, speed: Binding, typos: Binding, sentence: Binding, typing: Binding}}
 */
const elements = {
    remaining: Binding.create(0, "remaining"),
    speed: Binding.create(0, "speed"),
    typos: Binding.create(0, "typos"),
    sentence: Binding.create("The quick brown fox jumped over the lazy dog.", "sentence"),
    typing: Binding.create("", "typing"),

    report: document.getElementById("report"),
    closeReport: document.getElementById("close-report")
};

/**
 * Represents the the data used to run the exam.
 *
 * @type {{words: number, sentences: string[]}}
 */
const data = {
    started: false,
    words: 0,
    current: 0,
    currentWord: 0,
    typedWord: "",
    sentences: ["The quick brown fox jumped over the lazy dog.",
                "Weeds are easy to grow, and hard to kill.",
                "It's all fun and games until someone loses an eye.",
                "If you mess with the bull, you get the horns.",
                "Winning the lottery is a bad retirement plan",
                "Hard work pays off, for some.",
                "Money can’t buy happiness, or so people tell me."]
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
            elements.remaining.value = 60;

            highlight();

            const task = setInterval(() => {
                if(--elements.remaining.value === 0) {
                    clearInterval(task);

                    data.started = false;

                    elements.typing.value = "";
                    elements.typing.target.disabled = true;

                    elements.report.classList.add("is-active");

                } else {
                    elements.speed.value = Math.round((data.words- elements.typos.value) * 60 / (60 - elements.remaining.value))
                }

            }, 1000)

        }

    },

    type: event => {
        if(event.key === ' ') {
            const words = data.sentences[data.current].split(" ");

            if(words[data.currentWord] !== data.typedWord) {
                elements.typos.value++;

                console.log("expected " + words[data.currentWord] + " got " + data.typedWord);
            }

            data.words++;
            data.typedWord = "";

            if(++data.currentWord === words.length) {
                changeSentence();

                data.currentWord = 0;
                data.typedWord = "";
            }

        } else {
            if(data.typedWord.length === 0) {
                highlight();
            }

            data.typedWord = data.typedWord.concat(event.key);
        }

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
    const word = data.sentences[data.current].split(" ")[data.currentWord];

    elements.sentence.target.innerHTML = data.sentences[data.current].replace(word, "<a class=\"type-prompt\">" + word + "</a>")
}

/**
 * Changes the sentence to different one randomly.
 *
 * @returns {number}
 */
function changeSentence() {
    const possible =  Math.floor(Math.random() * (Math.floor(data.sentences.length -1)));

    data.current = possible !== data.current ? possible : changeSentence();
    elements.sentence.value = data.sentences[possible];
    elements.typing.value = "";

    return possible;
}

elements.typing.target.onkeydown = callbacks.start;
elements.typing.target.onkeypress = callbacks.type;
elements.closeReport.target.onclick = callbacks.reportClose;
