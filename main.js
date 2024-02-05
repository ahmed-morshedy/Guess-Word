// Game Name
const gameName = "Guess The Country ";
document.title = gameName;
document.getElementById("game-name").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = ` Coded By Ahmed-Morshedy | ${gameName} `;

const changeLevel = document.querySelector(".change-level");

// game level
let gameLevel = 1;

//Words to guess
let words = [];
function generateWords() {
  if (gameLevel === 1) {
    words = ["Palestine", "China", "England", "Spain", "India", "France"];
  } else if (gameLevel === 2) {
    words = ["libya", "Bahrain", "Turkiye", "Mexico", "brazil", "Niger"];
  } else if (gameLevel === 3) {
    words = ["Pakistan", "Czech", "Chile", "Cameron", "Egypt", "Qatar"];
  } else {
    words = ["Lebanon", "Yemen", "Syria", "Iraq", "Kuwait", "Morocco"];
  }
  return words;
}
let wordsToGuess =
  generateWords()[Math.floor(Math.random() * words.length)].toLowerCase();
// words = generateWords();
let message = document.querySelector(".message");

// wordsToGuess() = words[Math.floor(Math.random() * words.length)].toLowerCase();
// game setting
let numOfTries = wordsToGuess.length;
let numOfLetters = wordsToGuess.length;
let currentTry = 1;

const numOfHints = document.querySelector(".hint span");
if (numOfLetters > 6) {
  numOfHints.innerHTML = "3";
} else {
  numOfHints.innerHTML = "1";
}

function generateInputs() {
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
      else if (e.key === "ArrowLeft") {
        const prevInput = inputs[currentIndex - 1];
        if (prevInput) prevInput.focus();
      }

      //Backspace
      else if (e.key === "Backspace") {
        let currentInput = inputs[currentIndex];
        currentInput.value = "";
        const prevInput = inputs[currentIndex - 1];

        if (prevInput) {
          prevInput.value = "";
          prevInput.focus();
        }
      }
    });
  });
}

const hintBtn = document.querySelector(".hint");
hintBtn.addEventListener("click", function () {
  let inputsfield = document.querySelectorAll(`.try-${currentTry} input`);
  const emptyInputs = Array.from(inputsfield).filter(
    (input) => input.value === ""
  );

  if (emptyInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyInputs.length);
    const randomInput = emptyInputs[randomIndex];
    const selectLtter = Array.from(inputsfield).indexOf(randomInput);
    randomInput.value = wordsToGuess[selectLtter].toUpperCase();
    randomInput.disabled = true;
    randomInput.classList.add("yes-in-place");
  } else if (emptyInputs.length === 0) {
    const randomIndex = Math.floor(Math.random() * inputsfield.length);
    const randomInput = inputsfield[randomIndex];
    const selectLtter = Array.from(inputsfield).indexOf(randomInput);
    randomInput.value = wordsToGuess[selectLtter].toUpperCase();
    randomInput.disabled = true;
    randomInput.classList.add("yes-in-place");
  }
  numOfHints.innerHTML = parseInt(numOfHints.innerHTML) - 1;
  if (numOfHints.innerHTML === "0") hintBtn.disabled = true;
});

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
    message.innerHTML = `You guessed the country correctly in ${currentTry} tries`;
    message.style = "color:green;";
    gameLevel++;
    wordsToGuess =
      generateWords()[Math.floor(Math.random() * words.length)].toLowerCase();
    numOfTries = wordsToGuess.length;
    numOfLetters = wordsToGuess.length;
    changeLevel.style.display = "inline-block";
    changeLevel.innerHTML = "Next Level";
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
      message.innerHTML = `You lost, the country was ${wordsToGuess}`;
      message.style = "color:red;";
      wordsToGuess =
        generateWords()[Math.floor(Math.random() * words.length)].toLowerCase();
      numOfTries = wordsToGuess.length;
      numOfLetters = wordsToGuess.length;
      changeLevel.style.display = "inline-block";
      changeLevel.style.backgroundColor = "black";
      changeLevel.innerHTML = "Change Word";
      checkBtn.disabled = true;
      hintBtn.disabled = true;
    }
  }
}
window.onload = function () {
  generateInputs();
};

changeLevel.addEventListener("click", function () {
  //remove all inputs
  const inputsContainer = document.querySelector(".inputs");
  inputsContainer.innerHTML = "";
  message.innerHTML = "";
  checkBtn.disabled = false;
  hintBtn.disabled = false;
  changeLevel.style.display = "none";
  currentTry = 1;
  generateInputs();
  if (gameLevel === 1) {
    numOfHints.innerHTML = "1";
  } else if (numOfLetters > 6) {
    numOfHints.innerHTML = "3";
  } else {
    numOfHints.innerHTML = "2";
  }
});
