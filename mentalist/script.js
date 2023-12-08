// window.onload = () => { 
//   var secretNumber = parseInt(Math.random() * 1001);

//   while (guess != secretNumber) {
//     var guess = prompt("Digite um número entre 0 e 1000");

//     if (guess == secretNumber) {
//       alert("Acertou!")
//     } else if (guess > secretNumber) {
//       alert("Errou... o número secreto é menor")
//     } else if (guess < secretNumber) {
//       alert("Errou... o número secreto é maior")
//     }
//   }
// }

const section_1_element = document.getElementById('section_1');
const section_2_element = document.getElementById('section_2');
const section_3_element = document.getElementById('section_3');

const input_1_element = document.getElementById("input_1");
const input_2_element = document.getElementById("input_2");

const result_1_element = document.getElementById("result_1");
const result_2_element = document.getElementById("result_2");
const result_3_element = document.getElementById("result_3");

const tip_element = document.getElementById("tip");

let secretNumber;

let input1Value = 0;
let input2Value = 1000;

let guesses = [];

function createRandomNumber() {
  const min = Math.ceil(input1Value);
  const max = Math.floor(input2Value);
  
  secretNumber = Math.floor(Math.random() * (max - min) + min); 
}

function showSection(section) {
  switch (section) {
    case 1:
      section_1_element.style.display = "block";
      section_2_element.style.display = "none";
      section_3_element.style.display = "none";
      break;

    case 2:
      section_1_element.style.display = "none";
      section_2_element.style.display = "block";
      section_3_element.style.display = "none";
      break;
    
    case 3:
      section_1_element.style.display = "none";
      section_2_element.style.display = "none";
      section_3_element.style.display = "block";
      break;
  
    default:
      section_1_element.style.display = "block";
      section_2_element.style.display = "none";
      section_3_element.style.display = "none";
      break;
  }
}

function handleInput(input) {
  if(input === 'input_1') {
    input1Value = input_1_element.value;
  } else if (input === 'input_2') {
    input2Value = input_2_element.value;
  }
}

function handleStart() {
  showSection(2);

  createRandomNumber();
}
  
function handleGuess(event) {
  event.preventDefault();

  const guessValue = event.target["guessValue"].value;

  guesses.push(guessValue);
  
  if (guessValue == secretNumber) {
    guess = guessValue;
    showSection(3)
    showResult(guesses, input1Value, input2Value);
  } else if (guessValue > secretNumber) {
    tip_element.innerText = "Errou... o número secreto é menor";
  } else if (guessValue < secretNumber) {
    tip_element.innerText = "Errou... o número secreto é maior";
  }
}

function showResult(guesses, min, max) {
  const numberGuesses = guesses.length;
  const correctGuess = guesses[numberGuesses - 1];

 result_1_element.innerText = correctGuess;

 result_2_element.innerText = numberGuesses;

 result_3_element.min = min;
 result_3_element.max = max;
 result_3_element.value = correctGuess;
 result_3_element.title = correctGuess;
}