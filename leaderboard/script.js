// var player_1 = {
//   name: "Paulo",
//   victory: 0,
//   draw: 0,
//   defeat: 0,
//   points: 0,
// }

// var player_2 = {
//   name: "Rafaella",
//   victory: 0,
//   draw: 0,
//   defeat: 0,
//   points: 0,
// }

// var player_3 = {
//   name: "Guilherme",
//   victory: 0,
//   draw: 0,
//   defeat: 0,
//   points: 0,
// }

// var player_4 = {
//   name: "Renato",
//   victory: 0,
//   draw: 0,
//   defeat: 0,
//   points: 0,
// }

// var tableElement = document.getElementById("playersTable");

// displayOnScreen();

// function displayOnScreen() {
//   tableElement.innerHTML = `
//     <tr>
//       <td>${player_1.name}</td>
//       <td>${player_1.victory}</td>
//       <td>${player_1.draw}</td>
//       <td>${player_1.defeat}</td>
//       <td>${player_1.points}</td>
//       <td><button onClick="addVictory(player_1)">Vitória</button></td>
//       <td><button onClick="addDraw(player_1)">Empate</button></td>
//       <td><button onClick="addDefeat(player_1)">Derrota</button></td>
//     </tr>
//   `;
// }

// function addVictory(player) {
//   player.victory++
//   player.points = player.points + 3

//   displayOnScreen()
// }

// function addDraw(player) {
//   player.draw++
//   player.points++

//   displayOnScreen()
// }

// function addDefeat(player) {
//   player.defeat++

//   displayOnScreen()
//  }

const form_element = document.getElementById("form");

let players = [];

form_element.addEventListener("submit", submit);

function submit(event) {
  event.preventDefault();

  const name = event.target["name"].value.trim();

  if(!name) {
    return;
  }
  
  const playerAlreadyExists = players.some((player) => player.name === name);

  if (playerAlreadyExists) {
    return;
  }

  createPlayer(name);

  event.target["name"].value = "";
}

function createUniqueId(name) {
  return name.toLowerCase().match(/[.\S]+/g).join("-") + "_" + String(Date.now())
}

function createPlayer(name) {
  const id = createUniqueId(name);

  const victories = 0;
  const draws = 0;
  const defeats = 0;
  const points = 0;

  savePlayer({
    id,
    name,
    victories,
    draws,
    defeats,
    points,
  });
}

function savePlayer(newPlayer) {
  players.push(newPlayer);

  renderPlayers();
}

function savePlayers(newPlayers) {
  players = newPlayers;

  renderPlayers();
}

function removePlayer(id) {
  const index = players.findIndex(player => player.id === id);

  players.splice(index, 1);

  renderPlayers();
}

function updatePlayer(playerToUpdate) {
  const index = players.findIndex(player => player.id === playerToUpdate.id);
  
  players.splice(index, 1, playerToUpdate)
  
  renderPlayers();
}

function victoryPlayer(id) {
  const player = players.find(player => player.id === id);
  
  const playerToUpdate = {
    ...player,
    victories: player.victories + 1,
    points: player.points + 3,
  }

  updatePlayer(playerToUpdate);
}

function drawPlayer(id) {
  const player = players.find(player => player.id === id);

  const playerToUpdate = {
    ...player,
    draws: player.draws + 1,
    points: player.points + 1,
  }

  updatePlayer(playerToUpdate);
}

function defeatPlayer(id) {
  const player = players.find(player => player.id === id);

  const playerToUpdate = {
    ...player,
    defeats: player.defeats + 1,
  }

  updatePlayer(playerToUpdate);
}

function renderPlayers() {
  const tbodyPlayersTable_element = document.getElementById("playersTable");

  tbodyPlayersTable_element.innerHTML = "";

  players.forEach((player) => {
    const tdPlayer_element = createPlayerTd(player);

    tbodyPlayersTable_element.appendChild(tdPlayer_element);
  });
}

function createPlayerTd(player) {
  const {
    id,
    name,
    victories,
    draws,
    defeats,
    points,
  } = player;
  
  const tr_element = document.createElement("tr");
  tr_element.id = id;

  const tdName_element = createTd(name);
  const tdVictory_element = createTd(victories);
  const tdDraw_element = createTd(draws);
  const tdDefeat_element = createTd(defeats);  
  const tdPoints_element = createTd(points);

  const tdButtonVictory_element = createTdButton("Vitória", () => victoryPlayer(id));
  const tdButtonDraw_element = createTdButton("Empate", () => drawPlayer(id));
  const tdButtonDefeat_element = createTdButton("Derrota", () => defeatPlayer(id));
  const tdButtonRemove_element =createTdButton("Remover",  () => removePlayer(id));
  
  tr_element.append(
    tdName_element,
    tdVictory_element,
    tdDraw_element,
    tdDefeat_element,
    tdPoints_element,
    tdButtonVictory_element,
    tdButtonDraw_element,
    tdButtonDefeat_element,
    tdButtonRemove_element,
  );

  return tr_element;
}

function createTd(text) {
  const td_element = document.createElement("td");

  td_element.innerText = text;

  return td_element;
}

function createTdButton(text, onClick) {
  const td_element = document.createElement("td");
  const button_element = document.createElement("button");

  button_element.innerText = text;
  button_element.onclick = onClick;
  td_element.appendChild(button_element);
  
  return td_element;
}