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

function handleStart() {
  const min = Math.ceil(input1Value);
  const max = Math.floor(input2Value);

  const secretNumber = Math.floor(Math.random() * (max - min) + min); 

  console.log(secretNumber)

  let guess

  while (guess != secretNumber) {
    guess = prompt(`Digite um número entre ${input1Value} e ${input2Value}`);
    
    if (guess == secretNumber) {
      alert("Acertou!")
    } else if (guess > secretNumber) {
      alert("Errou... o número secreto é menor")
    } else if (guess < secretNumber) {
      alert("Errou... o número secreto é maior")
    }
  }
}