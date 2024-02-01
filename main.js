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
    } else if (wordsToGuess.includes(letter)) {
      //check if the letter is in the word
      inputfield.classList.add("not-in-place");
      success = false;
      console.log("yes");
    } else {
      //check if the letter is not in the word
      inputfield.classList.add("wrong");
      success = false;
    }
  }
  // //get inputs
  // const inputs = document.querySelectorAll("input");

  // //get current try
  // const currentTryDiv = document.querySelector(`.try-${currentTry}`);

  // //get current try inputs
  // const currentTryInputs = currentTryDiv.querySelectorAll("input");

  // //get current try letters
  // const currentTryLetters = Array.from(currentTryInputs).map(
  //   (input) => input.value
  // );

  // //get current try letters joined
  // const currentTryLettersJoined = currentTryLetters.join("");

  // //check if all inputs are filled
  // const isAllInputsFilled = currentTryLetters.every((letter) => letter !== "");

  // //check if all inputs are filled
  // if (isAllInputsFilled) {
  //   //check if the word is correct
  //   if (currentTryLettersJoined === wordsToGuess) {
  //     //show success message
  //     const successMessage = document.querySelector(".success-message");
  //     successMessage.classList.add("show");
  //     successMessage.innerHTML = `You guessed the word correctly in ${currentTry} tries`;
  //     successMessage.style.color = "green";

  //     //disable all inputs
  //     inputs.forEach((input) => {
  //       input.disabled = true;
  //     });
  //   } else {
  //     //show error message
  //     const errorMessage = document.querySelector(".error-message");
  //     errorMessage.classList.add("show");
  //     errorMessage.innerHTML = `Wrong word, try again`;
  //     errorMessage.style.color = "red";

  //     //disable current try inputs
  //     currentTryInputs.forEach((input) => {
  //       input.disabled = true;
  //     });

  //     //enable next try inputs
  //     const nextTryDiv = document.querySelector(`.try-${currentTry + 1}`);
  //     if (nextTryDiv) {
  //       const nextTryInputs = nextTryDiv.querySelectorAll("input");
  //       nextTryInputs.forEach((input) => {
  //         input.disabled = false;
  //       });
  //     }

  //     //increase current try
  //     currentTry++;
  //   }
  // } else {
  //   //show error message
  //   const errorMessage = document.querySelector(".error-message");
  //   errorMessage.classList.add("show");
  //   errorMessage.innerHTML = `Please fill all inputs`;
  //   errorMessage.style.color = "red";
  // }
}

window.onload = function () {
  generateInputs();
};
