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

let playersList = [];

form_element.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const name = event.target["name"].value.trim();

  if(!name) {
    return;
  }

  const id = createUniqueId(name);

  const playersTable_element = document.getElementById("playersTable");

  const tr_element = document.createElement("tr");

  tr_element.id = id;

  const tdName_element = document.createElement("td");
  const tdVictory_element = document.createElement("td");
  const tdDraw_element = document.createElement("td");
  const tdDefeat_element = document.createElement("td");
  const tdPoints_element = document.createElement("td");
  const tdButtonVictory_element = document.createElement("td");
  const tdButtonDraw__element = document.createElement("td");
  const tdButtonDefeat_element = document.createElement("td");

  const buttonVictory_element = document.createElement("button");
  const buttonDraw_element = document.createElement("button");
  const buttonDefeat_element = document.createElement("button");

  buttonVictory_element.innerText = "Vitória";
  buttonDraw_element.innerText = "Empate";
  buttonDefeat_element.innerText = "Derrota";

  buttonVictory_element.onclick = () => console.log('handleVictory: ' + id);
  buttonDraw_element.onclick = () => console.log('handleDraw: ' + id);
  buttonDefeat_element.onclick = () => console.log('handleDefeat: ' + id);

  const victories = 0;
  const draws = 0;
  const defeats = 0;
  const points = 0;

  tdName_element.innerText = name;
  tdVictory_element.innerText = victories;
  tdDraw_element.innerText = draws;
  tdDefeat_element.innerText = defeats;
  tdPoints_element.innerText = points;

  tdButtonVictory_element.appendChild(buttonVictory_element);
  tdButtonDraw__element.appendChild(buttonDraw_element);
  tdButtonDefeat_element.appendChild(buttonDefeat_element);

  playersList.push({
    id,
    name,
    victories,
    draws,
    defeats,
    points,
  })

  tr_element.append(
    tdName_element,
    tdVictory_element,
    tdDraw_element,
    tdDefeat_element,
    tdPoints_element,
    tdButtonVictory_element,
    tdButtonDraw__element,
    tdButtonDefeat_element,
  );

  playersTable_element.appendChild(tr_element);

  event.target["name"].value = "";
}

function createUniqueId(name) {
  return name.toLowerCase().match(/[.\S]+/g).join("-") + "_" + String(Date.now())
}