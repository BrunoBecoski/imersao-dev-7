window.onload = () => { 
  var secretNumber = parseInt(Math.random() * 1001);

  while (guess != secretNumber) {
    var guess = prompt("Digite um número entre 0 e 1000");

    if (guess == secretNumber) {
      alert("Acertou!")
    } else if (guess > secretNumber) {
      alert("Errou... o número secreto é menor")
    } else if (guess < secretNumber) {
      alert("Errou... o número secreto é maior")
    }
  }
}
