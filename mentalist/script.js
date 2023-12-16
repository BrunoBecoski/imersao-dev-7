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

let minNumber;
let maxNumber;
let secretNumber;
let guesses = [];

function createRandomNumber(min, max) {
  minNumber = min;
  maxNumber = max;

  secretNumber = Math.floor(Math.random() * (max - min) + min);
}

function getValue() {
  return Number(document.getElementById("guessRange").value);
}

function setValue(value) {
  document.getElementById("guessRange").value = value;
  document.getElementById("guessValue").value = value;
}

function showSection(section) {
  const section_1_element = document.getElementById('section_1');
  const section_2_element = document.getElementById('section_2');
  const section_3_element = document.getElementById('section_3');

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

function showResult() {
  document.getElementById("secretNumber").innerText = secretNumber;
  document.getElementById("guessAttempts").innerText = guesses.length;
 }
 
function handleStart() {
  const min = Number(document.getElementById("inputMin").value);
  const max = Number(document.getElementById("inputMax").value);

  const range = document.getElementById("guessRange");

  const startValue = Math.ceil((max - min) / 2);

  if (min !== 0 && max !== 0) {
    if (min < max) {
      createRandomNumber(min, max);

      document.getElementById("guessMin").innerText = min;
      document.getElementById("guessMax").innerText = max;

      range.min = min;
      range.max = max;
      setValue(startValue);

      showSection(2);

      return;
    }
  }

  alert('Valor inválido');
}

function handleRange() {
  const value = getValue();

  if (guesses.length !== 0) {    
    const belowValues = guesses.filter(guess => guess < secretNumber);
    const aboveValues = guesses.filter(guess => guess > secretNumber);
    
    const belowValue = belowValues.sort((a, b) => a - b).reverse()[0];
    const aboveValue = aboveValues.sort((a, b) => a - b)[0];    

    if (belowValue > value) {
      setValue(belowValue + 1);
      return;
    };
    
    if (aboveValue < value) {
      setValue(aboveValue - 1)
      return;
    };  
  }
  
  setValue(value);
}

function handleDecrease() {
  const value = getValue() - 1;
  setValue(value);
}

function handleIncrease() {
  const value = getValue() + 1;
  setValue(value);
}

function handleGuess() {
  const value = getValue();

  guesses.push(value);
  const tip_element = document.getElementById("tip");

  document.getElementById("attemptsNumber").innerText = guesses.length;
  document.getElementById("attemptsHistory").innerText = guesses;

  if (Number(value) === secretNumber) {
    showResult();
    showSection(3);
  } else if (value > secretNumber) {
    setValue(value - 1)
    tip_element.innerText = "Errou... o número secreto é menor";
  } else if (value < secretNumber) {
    setValue(value + 1)
    tip_element.innerText = "Errou... o número secreto é maior";
  }
}

function handleReplay() {
  document.getElementById("attemptsNumber").innerText = "";
  document.getElementById("attemptsHistory").innerText = "";
  document.getElementById("tip").innerText = "";
  guesses = [];
  showSection(1);
}