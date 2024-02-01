// Game Name
const gameName = "Guess The Word ";
document.title = gameName;
document.getElementById("game-name").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = ` Coded By Ahmed-Morshedy | ${gameName} `;

//Words to guess
let wordsToGuess = "";
const words = [
  "Create",
  "update",
  "Delete",
  "column",
  "Master",
  "Slave",
  "Primary",
  "Secondary",
  "Replica",
];

let message = document.querySelector(".message");

wordsToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordsToGuess);
// game setting
let numOfTries = wordsToGuess.length;
let numOfLetters = wordsToGuess.length;
let currentTry = 1;
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

  if (success) {
    //show success message
    message.innerHTML = `You guessed the word correctly in ${currentTry} tries`;
    message.style = "color:green; font-size: 20px; font-weight: bold";
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
      message.style = "color:red; font-size: 20px; font-weight: bold";
    }
  }
}
window.onload = function () {
  generateInputs();
};
