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
let guesses = 0;

function createRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getValue() {
  return Number(document.getElementById("range").value);
}

function setValue(value) {
  document.getElementById("range").value = value;
  document.getElementById("input").value = value;
}

function showSection(section) {
  const section_1_element = document.getElementById('section_1');
  const section_2_element = document.getElementById('section_2');
  const section_3_element = document.getElementById('section_3');

  switch (section) {
    case 1:
      section_1_element.style.display = "flex";
      section_2_element.style.display = "none";
      section_3_element.style.display = "none";
      break;

    case 2:
      section_1_element.style.display = "none";
      section_2_element.style.display = "flex";
      section_3_element.style.display = "none";
      break;
    
    case 3:
      section_1_element.style.display = "none";
      section_2_element.style.display = "none";
      section_3_element.style.display = "flex";
      break;
  
    default:
      section_1_element.style.display = "flex";
      section_2_element.style.display = "none";
      section_3_element.style.display = "none";
      break;
  }
}

function showResult() {
  document.getElementById("secretNumber").innerText = secretNumber;
  document.getElementById("guessAttempts").innerText = guesses;
 }

function handleStart() {
  let min;
  let max;

  const inputValue_1 = Number(document.getElementById("input_1").value);
  const inputValue_2 = Number(document.getElementById("input_2").value);

  if (isNaN(inputValue_1) || isNaN(inputValue_2)) {
    return;
  }

  if(inputValue_1 === 0) {
    return;
  }

  if(inputValue_2 === 0) {
    return;
  }

  if(inputValue_1 === inputValue_2) {
    return;
  }

  if (inputValue_1 < inputValue_2) {
    min = inputValue_1;
    max = inputValue_2;
  } else {
    min = inputValue_2;
    max = inputValue_1;
  }

  minNumber = min;
  maxNumber = max;

  const guess = document.getElementById("range");
  
  const startValue = Math.ceil(((max - min) / 2) + min);
  secretNumber = createRandomNumber(min, max);

  document.getElementById("guessMin").innerText = min;
  document.getElementById("guessMax").innerText = max;

  guess.min = min;
  guess.max = max;
  setValue(startValue);

  showSection(2);
}

function handleInput() {
  const value = getValue();
  setValue(value);
}

function handleGuess() {
  const value = getValue();
  
  const guess = document.getElementById("range");
  const p_element = document.getElementById("tip_1");
  const strong_element = document.getElementById("tip_2");
  const guessMin_element = document.getElementById("guessMin");
  const guessMax_element = document.getElementById("guessMax");

  guesses = guesses + 1;
  
  p_element.innerHTML = "";
  
  document.getElementById("attemptsNumber").innerText = guesses;
  
  if (Number(value) === secretNumber) {
    showResult();
    showSection(3);
  } else if (value > secretNumber) {
    maxNumber = value;
    strong_element.innerText = "menor";
    guess.max = value - 1;
    guessMax_element.innerText = value - 1;
  } else if (value < secretNumber) {
    minNumber = value;
    strong_element.innerText = "maior";
    guess.min = value + 1;
    guessMin_element.innerText = value + 1;
  }

  setValue(Math.ceil(((maxNumber - minNumber) / 2) + minNumber))
  p_element.innerText = "Errou... o número secreto é";
}

function handleReplay() {
  document.getElementById("attemptsNumber").innerText = "";
  document.getElementById("tip_1").innerText = "";
  document.getElementById("tip_2").innerText = "";
  guesses = 0;
  showSection(1);
}