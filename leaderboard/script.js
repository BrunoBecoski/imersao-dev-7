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

form_element.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = event.target["name"].value;

  const playersTable_element = document.getElementById("playersTable");

  const tr_element = document.createElement("tr");

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

  buttonVictory_element.onclick = () => console.log('handleVictory: ' + name);
  buttonDraw_element.onclick = () => console.log('handleDraw: ' + name);
  buttonDefeat_element.onclick = () => console.log('handleDefeat: ' + name);


  tdName_element.innerText = name;
  tdVictory_element.innerText = 0;
  tdDraw_element.innerText = 0;
  tdDefeat_element.innerText = 0;
  tdPoints_element.innerText = 0;

  tdButtonVictory_element.appendChild(buttonVictory_element);
  tdButtonDraw__element.appendChild(buttonDraw_element);
  tdButtonDefeat_element.appendChild(buttonDefeat_element);


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
})