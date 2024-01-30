// Game Name
const gameName = "Guess The Word ";
document.title = gameName;
document.getElementById("game-name").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = ` Coded By Ahmed-Morshedy | ${gameName} `;

// game setting
let numOfTries = 6;
let numOfLetters = 6;
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

window.onload = function () {
  generateInputs();
};
