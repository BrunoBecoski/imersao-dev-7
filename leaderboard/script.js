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

let playersList = [];

const createPlayerForm_element = document.getElementById("createPlayerForm");

createPlayerForm_element.addEventListener("submit", submitCreatePlayer);

function submitCreatePlayer(event) {
  event.preventDefault();

  const name = event.target["name"].value.trim();
  const avatar = event.target["avatar"].value.trim();

  if(!name || !avatar) {
    return;
  }

  const nameUsed = playersList.some((player) => player.name === name);
  const avatarUsed = playersList.some((player) => player.avatar === avatar);

  if (nameUsed || avatarUsed) {
    return;
  }
    
  let wins = Number(event.target["wins"].value.trim());
  let draws = Number(event.target["draws"].value.trim());
  let defeats = Number(event.target["defeats"].value.trim());

  if (isNaN(wins)) {
    wins = 0;
  }

  if (isNaN(draws)) {
    draws = 0;
  }

  if (isNaN(defeats)) {
    defeats = 0;
  }
  
  const player = {
    id: createUniqueId(name),
    name,
    avatar,
    wins,
    draws,
    defeats,
    points: wins * 3 + draws,
  }
    
  addPlayerOnList(player);
  addPlayerOnTable(player);
  
  event.target["name"].value = "";
  event.target["avatar"].value = "";
  event.target["wins"].value = "0";
  event.target["draws"].value = "0";
  event.target["defeats"].value = "0";
}

function createUniqueId(name) {
  return name.toLowerCase().match(/[.\S]+/g).join("-") + "_" + String(Date.now());
}

function addPlayerOnList(player) {
  playersList.push(player);
}

function addPlayerOnTable(player) {
  const tbody_element = document.getElementById("playersTable");
  const playerTr_element = createPlayerTr(player);

  tbody_element.appendChild(playerTr_element);
}

function updatePlayerOnList(player) {
  const index = playersList.findIndex(player => player.id === player.id);
  
  playersList.splice(index, 1, player);
}

function updatePlayerTrOnTable(player) {
  const currentTd_element = document.getElementById(player.id);
  const playerTr_element = createPlayerTr(player);

  currentTd_element.replaceWith(playerTr_element);
}

function updatePlayerInputTrOnTable(player) {
  const currentTd_element = document.getElementById(player.id);
  const playerInputTr_element = createPlayerInputTr(player);

  currentTd_element.replaceWith(playerInputTr_element);
}

function removePlayerOnList(id) {
  const index = playersList.findIndex(player => player.id === id);

  playersList.splice(index, 1);
}

function removePlayerOnTable(id) {
  const playerTr_element = document.getElementById(id);

  playerTr_element.remove();
}

function updatePlayerWins(player) {
  const newPlayer = {
    ...player,
    wins: player.wins + 1,
    points: player.points + 3
  };

  updatePlayerOnList(newPlayer);
  updatePlayerTrOnTable(newPlayer);
}

function updatePlayerDraws(player) {
  const newPlayer = {
    ...player,
    draws: player.draws + 1,
    points: player.points + 1,
  };

  updatePlayerOnList(newPlayer);
  updatePlayerTrOnTable(newPlayer);
}

function updatePlayerDefeats(player) {
  const newPlayer = {
    ...player,
    defeats: player.defeats + 1,
  };
  
  updatePlayerOnList(newPlayer);
  updatePlayerTrOnTable(newPlayer);
}

function savePlayer(id) {
  const avatar = document.getElementById(`avatar_${id}`).value;
  const name = document.getElementById(`name_${id}`).value;
  const wins = Number(document.getElementById(`wins_${id}`).value);
  const draws = Number(document.getElementById(`draws_${id}`).value);
  const defeats = Number(document.getElementById(`defeats_${id}`).value);
  const points = wins * 3 + draws;

  const playersWithoutCurrentPlayer = playersList.filter(player => player.id !== id);

  const nameUsed = playersWithoutCurrentPlayer.some((player) => player.name === name);
  const avatarUsed = playersWithoutCurrentPlayer.some((player) => player.avatar === avatar);

  if (nameUsed || avatarUsed) {
    return;
  }
  
  const player = {
    id,
    avatar,
    name,
    wins,
    draws,
    defeats,
    points,
  }

  updatePlayerOnList(player);
  updatePlayerTrOnTable(player)
}

function removePlayer(id) {
  removePlayerOnList(id);
  removePlayerOnTable(id);
}

function addPlayersOnTable(player) {
  const tbody_element = document.getElementById("playersTable");

  tbody_element.innerHTML = "";

  playersList.forEach((player) => {
    const tdPlayer_element = createPlayerTr(player);

    tbody_element.appendChild(tdPlayer_element);
  });
}

function createPlayerTr(player) {
  const {
    id,
    avatar,
    name,
    wins,
    draws,
    defeats,
    points,
  } = player;
  
  const tr_element = document.createElement("tr");
  tr_element.id = id;

  const tdAvatar_element = createImgTd(name, avatar);

  const tdName_element = createTd(name);
  const tdWins_element = createTd(wins);
  const tdDraws_element = createTd(draws);
  const tdDefeats_element = createTd(defeats);  
  const tdPoints_element = createTd(points);

  const tdButtonWin_element = createButtonTd("Vitória", () => updatePlayerWins(player));
  const tdButtonDraw_element = createButtonTd("Empate", () => updatePlayerDraws(player));
  const tdButtonDefeat_element = createButtonTd("Derrota", () => updatePlayerDefeats(player));
  const tdButtonEdit_element = createButtonTd("Editar",  () => updatePlayerInputTrOnTable(player));
  
  tr_element.append(
    tdAvatar_element,
    tdName_element,
    tdWins_element,
    tdDraws_element,
    tdDefeats_element,
    tdPoints_element,
    tdButtonWin_element,
    tdButtonDraw_element,
    tdButtonDefeat_element,
    tdButtonEdit_element,
  );

  return tr_element;
}

function createPlayerInputTr(player) {
  const {
    id,
    avatar,
    name,
    wins,
    draws,
    defeats,
    points,
  } = player;
  
  const tr_element = document.createElement("tr");
  tr_element.id = id;

  const tdInputAvatar_element = createInputTd(id, "avatar" ,avatar);
  const tdInputName_element = createInputTd(id, "name" ,name);
  const tdInputWins_element = createInputTd(id, "wins", wins);
  const tdInputDraws_element = createInputTd(id, "draws", draws);
  const tdInputDefeats_element = createInputTd(id, "defeats", defeats);  
  const tdInputPoints_element = createInputTd(id, "points", points);

  const tdButtonCancel_element = createButtonTd("Cancelar", () => updatePlayerTrOnTable(player));
  const tdButtonSave_element = createButtonTd("Salvar", () => savePlayer(id));
  const tdButtonRemove_element = createButtonTd("Remover", () => removePlayer(id));

  tr_element.append(
    tdInputAvatar_element,
    tdInputName_element,
    tdInputWins_element,
    tdInputDraws_element,
    tdInputDefeats_element,
    tdInputPoints_element,
    tdButtonCancel_element,
    tdButtonSave_element,
    tdButtonRemove_element,
  );

  return tr_element;
}

function createImgTd(name, avatar) {
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

function createButtonTd(text, onClick) {
  const td_element = document.createElement("td");
  const button_element = document.createElement("button");

  button_element.innerText = text;
  button_element.onclick = onClick;
  
  td_element.appendChild(button_element);
  
  return td_element;
}

function createInputTd(id, name, value) {
  const td_element = document.createElement("td");
  const input_element = document.createElement("input");

  input_element.value = value;
  input_element.id = `${name}_${id}`;

  td_element.appendChild(input_element);

  return td_element;
}