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

let minNumber;
let maxNumber;
let secretNumber;
let guesses = [];

function createRandomNumber(min, max) {
  minNumber = Number(min);
  maxNumber = Number(max);

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

function handleStart() {
  const min = document.getElementById("inputMin").value;
  const max = document.getElementById("inputMax").value;

  if (min.length > 0 || max.length > 0) {
    if (min !== max && min < max) {
      createRandomNumber(min, max);

      document.getElementById("guessMin").innerText = minNumber;
      document.getElementById("guessMax").innerText = maxNumber;

      showSection(2);

      return;
    }
  }

  alert('Valor inválido');
}

function handleGuess() {
  const guessValue = document.getElementById("guessValue").value;
  guesses.push(guessValue);
  const tip_element = document.getElementById("tip");

  if (guessValue == secretNumber) {
    guess = guessValue;
    showResult();
    showSection(3);
  } else if (guessValue > secretNumber) {
    tip_element.innerText = "Errou... o número secreto é menor";
  } else if (guessValue < secretNumber) {
    tip_element.innerText = "Errou... o número secreto é maior";
  }
}

function showResult() {
 document.getElementById("secretNumber").innerText = secretNumber;
 document.getElementById("guessAttempts").innerText = guesses.length;
}
