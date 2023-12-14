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

function handleStart() {
  const min = Number(document.getElementById("inputMin").value);
  const max = Number(document.getElementById("inputMax").value);

  if (min !== 0 && max !== 0) {
    if (min < max) {
      createRandomNumber(min, max);

      document.getElementById("guessMin").innerText = min;
      document.getElementById("guessMax").innerText = max;

      document.getElementById("guessRange").min = min;
      document.getElementById("guessRange").max = max;

      showSection(2);

      return;
    }
  }

  alert('Valor inválido');
}

function handleRange(event) {
  const input = event.target;
  const value = event.target.value;

  if (minNumber > value) {
    input.value = minNumber;
  };
  
  if (maxNumber < value) {
    input.value = maxNumber;
  }; 

  document.getElementById("guessValue").value = event.target.value;
}

function handleInput(event) {
  document.getElementById("guessRange").value = event.target.value;
}

function handleGuess() {
  const guess = document.getElementById("guessValue");
  const guessValue = Number(guess.value)

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
  
  const equalGuess = guesses.some(guess => guessValue === guess);

  if (equalGuess) {
    guess.value = "";
    alert("Valor já foi chutado");
    return;
  }

  guesses.push(guessValue);
  const tip_element = document.getElementById("tip");

  document.getElementById("attemptsNumber").innerText = guesses.length;
  document.getElementById("attemptsHistory").innerText = guesses;

  if (Number(guessValue) === secretNumber) {
    guess.value = "";
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

function handleReplay() {
  document.getElementById("attemptsNumber").innerText = "";
  document.getElementById("attemptsHistory").innerText = "";
  document.getElementById("tip").innerText = "";
  document.getElementById("guessValue").value = "";
  guesses = [];
  showSection(1);
}