const hexcode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const button = document.getElementById("generateBtn");
let firstColor = document.getElementById("firstColor");
let firstHexDisplay = document.getElementById("firstHexDisplay");
let secondColor = document.getElementById("secondColor");
let secondHexDisplay = document.getElementById("secondHexDisplay");
let thirdColor = document.getElementById("thirdColor");
let thirdHexDisplay = document.getElementById("thirdHexDisplay");

function generateRandomNumber() {
  let randomNumber = Math.floor(Math.random() * hexcode.length);
  return randomNumber;
}

button.addEventListener("click", function () {
  let firstHexCode = "#";
  for (let firstLoop = 0; firstLoop < 6; firstLoop++) {
    firstHexCode += hexcode[generateRandomNumber()];
  }
  firstColor.style.backgroundColor = firstHexCode;
  firstHexDisplay.textContent = firstHexCode;

  let secondHexCode = "#";
  for (let secondLoop = 0; secondLoop < 6; secondLoop++) {
    secondHexCode += hexcode[generateRandomNumber()];
  }
  secondColor.style.backgroundColor = secondHexCode;
  secondHexDisplay.textContent = secondHexCode;

  let thirdHexCode = "#";
  for (let thirdLoop = 0; thirdLoop < 6; thirdLoop++) {
    thirdHexCode += hexcode[generateRandomNumber()];
  }
  thirdColor.style.backgroundColor = thirdHexCode;
  thirdHexDisplay.textContent = thirdHexCode;
});
