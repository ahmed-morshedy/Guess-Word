// Game Name
const gameName = "Guess The Word ";
document.title = gameName;
document.getElementById("game-name").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = ` Coded By Ahmed-Morshedy | ${gameName} `;
// const gameDescription = `Guess the word by entering the letters in the correct order. You have ${numOfTries} tries to guess the word.`;
// const gameDescriptionEl = document.querySelector(".game-description");
// gameDescriptionEl.innerHTML = gameDescription;
const changeLevel = document.querySelector(".change-level");
const hintBtn = document.querySelector(".hint");
// game level
let gameLevel = 1;

//Words to guess
let wordsToGuess = "";
let words = [];
if (gameLevel === 1) {
  words = ["Create", "update", "Delete", "column", "Master", "Slave"];
} else if (gameLevel === 2) {
  words = ["JavaScript", "Python", "Java", "C#", "C++", "Ruby"];
} else if (gameLevel === 3) {
  words = ["HTML", "CSS", "SASS", "LESS", "Bootstrap", "Tailwind"];
}
let message = document.querySelector(".message");

wordsToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

// game setting
let numOfTries = wordsToGuess.length;
let numOfLetters = wordsToGuess.length;
let currentTry = 1;

function generateInputs() {
  // console.log(wordsToGuess);
  console.log(gameLevel);
  //get inputs container
  const inputsContainer = document.querySelector(".inputs");
  //create main try div
  for (let i = 1; i <= numOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disable-inputs");

    //create letters inputs
    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      input.type = "text";
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }

  //focus on first input
  inputsContainer.children[0].children[1].focus();

  //disable all inputs except first try
  const inputsInDisDiv = document.querySelectorAll(".disable-inputs input");
  inputsInDisDiv.forEach((input) => {
    input.disabled = true;
  });

  // convert all inputs to uppercase
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keyup", function (e) {
      //get current index
      const currentIndex = Array.from(inputs).indexOf(this);

      //ArrowRight
      if (e.key === "ArrowRight") {
        const nextInput = inputs[currentIndex + 1];
        if (nextInput) nextInput.focus();
      }

      //ArrowLeft and Backspace
      else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        const prevInput = inputs[currentIndex - 1];
        if (prevInput) prevInput.focus();
      }
    });
  });
}

const checkBtn = document.querySelector(".check");
checkBtn.addEventListener("click", checkWord);

function checkWord() {
  let success = true;

  for (let i = 1; i <= numOfLetters; i++) {
    const inputfield = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputfield.value.toLowerCase();
    const accualLetter = wordsToGuess[i - 1];
    //game logic

    if (letter === accualLetter) {
      //check if the letter is correct
      inputfield.classList.add("yes-in-place");
    } else if (wordsToGuess.includes(letter) && letter !== "") {
      //check if the letter is in the word
      inputfield.classList.add("not-in-place");
      success = false;
    } else {
      //check if the letter is not in the word
      inputfield.classList.add("wrong");
      success = false;
    }
  }
  let allTries = document.querySelectorAll(".inputs div ");
  allTries.forEach((tryDiv) => {
    tryDiv.classList.add("disable-inputs");
  });
  if (success) {
    //show success message
    message.innerHTML = `You guessed the word correctly in ${currentTry} tries`;
    message.style = "color:green;";
    // changeLevel.style.display = "inline-block";
    // changeLevel.innerHTML = "Next Level";
    gameLevel++;
    // wordsToGuess =
    //   words[Math.floor(Math.random() * words.length)].toLowerCase();
    checkBtn.disabled = true;
    hintBtn.disabled = true;
  } else {
    currentTry++;
    const nextTry = document.querySelector(`.try-${currentTry}`);

    if (nextTry) {
      nextTry.classList.remove("disable-inputs");
      const inputsInDisDiv = document.querySelectorAll(
        `.try-${currentTry} input`
      );

      inputsInDisDiv.forEach((input) => {
        input.disabled = false;
      });

      document.querySelector(`.try-${currentTry} input`).focus();
    }
    //show lose message
    else {
      message.innerHTML = `You lost,  the word was ${wordsToGuess}`;
      message.style = "color:red;";
      // changeLevel.style.display = "inline-block";
      // changeLevel.style.backgroundColor = "black";
      // changeLevel.innerHTML = "Change Word";
      checkBtn.disabled = true;
      hintBtn.disabled = true;
    }
  }
}
window.onload = function () {
  generateInputs();
};

// changeLevel.addEventListener("click", function () {
//   //remove all inputs
//   const inputsContainer = document.querySelector(".inputs");
//   inputsContainer.innerHTML = "";
//   console.log(wordsToGuess);
//   message.innerHTML = "";
//   checkBtn.disabled = false;
//   generateInputs();
//   changeLevel.style.display = "none";
// });
