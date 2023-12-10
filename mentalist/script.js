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
  minNumber = min;
  maxNumber = max;

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
  const min = Number(document.getElementById("inputMin").value);
  const max = Number(document.getElementById("inputMax").value);

  if (min !== 0 && max !== 0) {
    if (min < max) {
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
  const guess = document.getElementById("guessValue");
  
  const guessValue = Number(guess.value)

  guesses.push(guessValue);
  const tip_element = document.getElementById("tip");

  if (guessValue > maxNumber) {
    guess.value = "";
    alert('Valor muito alto');
    return;
  }

  if (guessValue < minNumber) {
    guess.value = "";
    alert('Valor muito baixo');
    return;
  }

  if (Number(guessValue) === secretNumber) {
    showResult();
    showSection(3);
  } else if (guessValue > secretNumber) {
    guess.value = "";
    tip_element.innerText = "Errou... o número secreto é menor";
  } else if (guessValue < secretNumber) {
    guess.value = "";
    tip_element.innerText = "Errou... o número secreto é maior";
  }
}

function showResult() {
 document.getElementById("secretNumber").innerText = secretNumber;
 document.getElementById("guessAttempts").innerText = guesses.length;
}
