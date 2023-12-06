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

const root_element = document.getElementById("root");

const input_1_element = document.getElementById("input_1");
const input_2_element = document.getElementById("input_2");

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
  const h2_element = document.createElement('h2');
  const p_element = document.createElement('p');
  const input_element = document.createElement('input');

  const correctGuess = guesses[guesses.length - 1];

  h2_element.innerHTML = "Parabéns você acertou o número era: " + correctGuess;
  p_element.innerText = "Número de tentativas: " + guesses.length;
  
  input_element.type = "range";
  input_element.min = min;
  input_element.max = max;
  input_element.value = correctGuess;
  input_element.title = correctGuess;

  root_element.append(h2_element, p_element, input_element)
}