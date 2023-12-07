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

const input_1_element = document.getElementById("input_1");
const input_2_element = document.getElementById("input_2");

const result_1_element = document.getElementById("result_1");
const result_2_element = document.getElementById("result_2");
const result_3_element = document.getElementById("result_3")

let input1Value = 1;
let input2Value = 1000;

function handleInput(input) {
  if(input === 'input_1') {
    input1Value = input_1_element.value
  } else if (input === 'input_2') {
    input2Value = input_2_element.value
  }
}

function createRandomNumber(input1Value, input2Value) {
  const min = Math.ceil(input1Value);
  const max = Math.floor(input2Value);
  
  const secretNumber = Math.floor(Math.random() * (max - min) + min); 

  return {
    min,
    max,
    secretNumber,
  };
}

function handleStart() {
  const { 
    min,
    max,
    secretNumber
  } = createRandomNumber(input1Value, input2Value);

  section_1_element.style.display = "none";
  section_2_element.style.display = "block";

  console.log(secretNumber);

  let guess

  let guesses = []

  while (guess != secretNumber) {
    guess = prompt(`Digite um número entre ${input1Value} e ${input2Value}`);
    guesses.push(guess)

    if (guess == secretNumber) {
      alert("Acertou!")
      
      showResult(guesses, min, max);
    } else if (guess > secretNumber) {
      alert("Errou... o número secreto é menor")
    } else if (guess < secretNumber) {
      alert("Errou... o número secreto é maior")
    }
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