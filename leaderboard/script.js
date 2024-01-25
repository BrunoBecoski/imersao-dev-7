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
  const avatar = event.target["avatar"].value.trim();

  if(!name || !avatar) {
    return;
  }

  const nameUsed = players.some((player) => player.name === name);
  const avatarUsed = players.some((player) => player.avatar === avatar);

  if (nameUsed || avatarUsed) {
    return;
  }
    
  let victories = Number(event.target["victories"].value.trim());
  let draws = Number(event.target["draws"].value.trim());
  let defeats = Number(event.target["defeats"].value.trim());

  if (isNaN(victories)) {
    victories = 0;
  }

  if (isNaN(draws)) {
    draws = 0;
  }

  if (isNaN(defeats)) {
    defeats = 0;
  }
  
  createPlayer({
    name,
    avatar,
    victories,
    draws,
    defeats,
  });
  
  event.target["name"].value = "";
  event.target["avatar"].value = "";
  event.target["victories"].value = "0";
  event.target["draws"].value = "0";
  event.target["defeats"].value = "0";
}

function createUniqueId(name) {
  return name.toLowerCase().match(/[.\S]+/g).join("-") + "_" + String(Date.now());
}

function createPlayer(player) {
  const {
    name,
    avatar,
    victories,
    draws,
    defeats,
  } = player;

  const id = createUniqueId(name);

  const points = victories * 3 + draws;

  players.push({
    id,
    name,
    avatar,
    victories,
    draws,
    defeats,
    points,
  });

  renderPlayers();
}

function editPlayer() {
  renderPlayersForm();
}

function removePlayer(id) {
  const index = players.findIndex(player => player.id === id);

  players.splice(index, 1);

  renderPlayers();
}

function updatePlayer(playerToUpdate) {
  const index = players.findIndex(player => player.id === playerToUpdate.id);
  
  players.splice(index, 1, playerToUpdate)
}

function updatePlayerTd(player) {
  const playerTd_element = createPlayerTd(player);
  const currentTd_element = document.getElementById(player.id);

  currentTd_element.replaceWith(playerTd_element);
}

function victoryPlayer(player) {
  const playerUpdated = {
    ...player,
    victories: player.victories + 1,
    points: player.points + 3
  }

  updatePlayer(player);
  updatePlayerTd(playerUpdated);
}

function drawPlayer(player) {
  const playerToUpdate = {
    ...player,
    draws: player.draws + 1,
    points: player.points + 1,
  }

  updatePlayer(player);
  updatePlayerTd(playerToUpdate);
}

function defeatPlayer(player) {
  const playerToUpdate = {
    ...player,
    defeats: player.defeats + 1,
  }
  
  updatePlayer(player);
  updatePlayerTd(playerToUpdate);
}

function renderPlayers() {
  const tbodyPlayersTable_element = document.getElementById("playersTable");

  tbodyPlayersTable_element.innerHTML = "";

  players.forEach((player) => {
    const tdPlayer_element = createPlayerTd(player);

    tbodyPlayersTable_element.appendChild(tdPlayer_element);
  });
}

function renderPlayersForm() {
  const tbodyPlayersTable_element = document.getElementById("playersTable");

  tbodyPlayersTable_element.innerHTML = "";

  players.forEach((player) => {
    const tdPlayerForm_element = createPlayerTdForm(player);

    tbodyPlayersTable_element.appendChild(tdPlayerForm_element);
  });
}

function createPlayerTd(player) {
  const {
    id,
    avatar,
    name,
    victories,
    draws,
    defeats,
    points,
  } = player;
  
  const tr_element = document.createElement("tr");
  tr_element.id = id;

  const tdAvatar_element = createTdImg(name, avatar);

  const tdName_element = createTd(name);
  const tdVictories_element = createTd(victories);
  const tdDraws_element = createTd(draws);
  const tdDefeats_element = createTd(defeats);  
  const tdPoints_element = createTd(points);

  const tdButtonVictory_element = createTdButton("Vitória", () => victoryPlayer(player));
  const tdButtonDraw_element = createTdButton("Empate", () => drawPlayer(player));
  const tdButtonDefeat_element = createTdButton("Derrota", () => defeatPlayer(player));
  const tdButtonRemove_element =createTdButton("Editar",  () => editPlayer());
  
  tr_element.append(
    tdAvatar_element,
    tdName_element,
    tdVictories_element,
    tdDraws_element,
    tdDefeats_element,
    tdPoints_element,
    tdButtonVictory_element,
    tdButtonDraw_element,
    tdButtonDefeat_element,
    tdButtonRemove_element,
  );

  return tr_element;
}

function createPlayerTdForm(player) {
  const {
    id,
    avatar,
    name,
    victories,
    draws,
    defeats,
    points,
  } = player;
  
  const tr_element = document.createElement("tr");
  tr_element.id = id;

  const tdInputAvatar_element = createTdInput(id, "avatar" ,avatar);
  const tdInputName_element = createTdInput(id, "name" ,name);
  const tdInputVictories_element = createTdInput(id, "victories", victories);
  const tdInputDraws_element = createTdInput(id, "draws", draws);
  const tdInputDefeats_element = createTdInput(id, "defeats", defeats);  
  const tdInputPoints_element = createTdInput(id, "points", points);

  const tdButtonCancel_element = createTdButton("Cancelar", () => cancelPlayer(id));
  const tdButtonSave_element = createTdButton("Salvar", () => savePlayer(id));
  const tdButtonRemove_element = createTdButton("Remover", () => removePlayer());

  tr_element.append(
    tdInputAvatar_element,
    tdInputName_element,
    tdInputVictories_element,
    tdInputDraws_element,
    tdInputDefeats_element,
    tdInputPoints_element,
    tdButtonCancel_element,
    tdButtonSave_element,
    tdButtonRemove_element,
  );

  return tr_element;
}

function cancelPlayer() {
  renderPlayers();
}

function savePlayer(id) {
  const avatar = document.getElementById(`avatar_${id}`).value;
  const name = document.getElementById(`name_${id}`).value;
  const victories = Number(document.getElementById(`victories_${id}`).value);
  const draws = Number(document.getElementById(`draws_${id}`).value);
  const defeats = Number(document.getElementById(`defeats_${id}`).value);

  updatePlayer({
    id,
    avatar,
    name,
    victories,
    draws,
    defeats,
    points: victories * 3 + draws,
  });
}

function createTdImg(name, avatar) {
  const td_element = document.createElement("td");
  const img_element = document.createElement("img");

  img_element.alt = name;
  img_element.title = name;
  img_element.src = avatar;

  td_element.appendChild(img_element);

  return td_element;
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

function createTdInput(id, name, value) {
  const td_element = document.createElement("td");
  const input_element = document.createElement("input");

  input_element.value = value;
  input_element.id = `${name}_${id}`;

  td_element.appendChild(input_element);

  return td_element;
}