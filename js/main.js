// create letters buttons 
const letters = "abcdefghijklmnopqrstuvwxyz";
const lettersArray = Array.from(letters);
// console.log(lettersArray);
// select letters container
let lettersContainer = document.querySelector(".letters");
let lettersBox = "";
// create span for each letter
lettersArray.forEach((e) => {
    lettersBox += `<span class="letter-box">${e}</span>`;
});
// insert letters into the page
lettersContainer.innerHTML += lettersBox;


// create object for random word & category 
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

// get all categories
let categoryWord = Object.keys(words);

// pick random category
let randomPropNum = Math.floor(Math.random() * categoryWord.length);
let randomPropName = categoryWord[randomPropNum];

// pick random word from category
let randomWordNum = Math.floor(Math.random() * words[randomPropName].length);
let randomWordName = words[randomPropName][randomWordNum];

// show category name
let catergoryName = document.querySelector(".span-catergory");
catergoryName.innerHTML = randomPropName;


// create letters guess container
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert word to array
let arrayWordGuess = Array.from(randomWordName);
// console.log(arrayWordGuess);

let guesBox = "";

// create empty spans for each letter
arrayWordGuess.forEach((e) => {
    const className = (e === " ") ? "space" : "";
    guesBox += `<span class="${className}"></span>`;
});
// totalLetters withaut space
let totalLetters = arrayWordGuess.filter((char) => char !== " ").length;
// insert guess boxes into page
lettersGuessContainer.innerHTML = guesBox;

// get all guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");
// console.log(guessSpans)

let theDraw = document.querySelector(".hangman-draw");

// set wrong attempts counter
let wrongAttempts = 0;

// set correct guessed letters counter
let checkDone = 0;


// handle letter click
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("letter-box") &&
        !e.target.classList.contains("clicked")) {

        let theStates = false;

        // mark letter as clicked
        e.target.classList.add("clicked")

        // get selected letter
        let choosenLetter = e.target.innerHTML;

        // check letter in word
        arrayWordGuess.forEach((e, i) => {
            if (choosenLetter === e.toLowerCase()) {
                theStates = true;
                console.log(`the letter is ${e} , index at ${i}`);

                // show letter in correct position
                guessSpans.forEach((span, index) => {
                    if (i === index) {
                        span.innerHTML = e;
                        checkDone++;
                    }
                })
            }
        })

        const successSound = document.querySelector("#success");
        const failedSound = document.querySelector("#failed");

        // wrong guess
        if (!theStates) {
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`)
            failedSound.currentTime = 0;
            failedSound.play();

            // game over condition
            if (wrongAttempts === 8) {
                lettersContainer.classList.add("end-trys")
                gameOver();
            }
        }
        else {
            // correct guess
            successSound.currentTime = 0;
            successSound.play();

            // win condition
            if (checkDone === totalLetters) {
                winGame();
            }
        }

    }
})

// game over screen
function gameOver() {
    document.body.innerHTML += ` <div class="game-popup">
        <div class="game-over">
            <p>Game Over</p>
            <p>The Word Is : ${randomWordName}</p>
            <button onclick="location.reload()">Try Again</button>
        </div>
    </div>`
}

// win screen
function winGame() {
    document.body.innerHTML += `<div class="game-popup">
        <div class="win-game">
                <p>You Win </p>
                <p>You guessed the (${randomWordName}) correctly</p>
                <button onclick="location.reload()">Play Again</button>
        </div>
    </div>`
}