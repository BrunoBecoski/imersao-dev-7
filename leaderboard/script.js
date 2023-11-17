var player_1 = {
  name: "Paulo",
  victory: 0,
  draw: 0,
  defeat: 0,
  points: 0,
}

var player_2 = {
  name: "Rafaella",
  victory: 0,
  draw: 0,
  defeat: 0,
  points: 0,
}

var player_3 = {
  name: "Guilherme",
  victory: 0,
  draw: 0,
  defeat: 0,
  points: 0,
}

var player_4 = {
  name: "Renato",
  victory: 0,
  draw: 0,
  defeat: 0,
  points: 0,
}

var tableElement = document.getElementById("playersTable");

displayOnScreen();

function displayOnScreen() {
  tableElement.innerHTML = `
    <tr>
      <td>${player_1.name}</td>
      <td>${player_1.victory}</td>
      <td>${player_1.draw}</td>
      <td>${player_1.defeat}</td>
      <td>${player_1.points}</td>
      <td><button onClick="addVictory(player_1)">Vitória</button></td>
      <td><button onClick="addDraw(player_1)">Empate</button></td>
      <td><button onClick="addDefeat(player_1)">Derrota</button></td>
    </tr>
  `;
}


function addVictory(player) {
  player.victory++
  player.points = player.points + 3

  displayOnScreen()
}

function addDraw(player) {
  player.draw++
  player.points++

  displayOnScreen()
}

function addDefeat(player) {
  player.defeat++

  displayOnScreen()
 }