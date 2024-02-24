// function addMovie() {
//   var favoriteMovie = document.getElementById("movie").value;
//   var moviesListElement = document.getElementById("moviesList");

//   moviesListElement.innerHTML = moviesListElement.innerHTML + "<img src=" + favoriteMovie + ">";

//   document.getElementById("movie").value = "";
// }

const formCreate_element = document.getElementById("formCreate");
formCreate_element.addEventListener("reset", resetFormCreate);
formCreate_element.addEventListener("submit", submitFormCreate);

const formEdit_element = document.getElementById("formEdit");
formEdit_element.addEventListener("reset", resetFormEdit);
formEdit_element.addEventListener("submit", submitFormEdit);

let mediaList = [];

getLocalStorage();

function getLocalStorage() {
  const localStorageMediaList = JSON.parse(localStorage.getItem("mediaList"));

  if (localStorageMediaList) {
    mediaList = localStorageMediaList; 
    renderMedias();
  } 
}

function setLocalStorage() {
  localStorage.setItem("mediaList", JSON.stringify(mediaList));
}

function addMedia(media) {
  mediaList.push(media);

  setLocalStorage();
  renderMedias();
}

function removeMedia(mediaId) {
  mediaList = mediaList.filter(media => media.id !== mediaId);

  setLocalStorage();
  renderMedias();
}

function updateMedia(mediaId, media) {
  const index = mediaList.findIndex((media) => media.id === mediaId);

  mediaList[index] = {
    ...media,
  }

  setLocalStorage();
  renderMedias();
}

function renderMedias(){
  const divList_element = document.getElementById("divList");

  divList_element.innerHTML = "";

  const mediaList_elements = mediaList.map(media => createDivMedia(media));

  mediaList_elements.forEach((media_element) => {
    divList_element.appendChild(media_element);
  })
}

function openFormCreate() { 
  clearForm("formCreate");

  document.getElementById("buttonOpenFormCreate").style.display = "none";
  document.getElementById("formCreate").style.display = "flex";
  document.getElementById("divList").style.display = "none";
} 
  
function closeFormCreate() {
  document.getElementById("buttonOpenFormCreate").style.display = "inline-block";
  document.getElementById("formCreate").style.display = "none";
  document.getElementById("divList").style.display = "grid";

  clearForm("formCreate");
}

function openFormEdit(mediaId) {
  document.getElementById("buttonOpenFormCreate").style.display = "none";
  document.getElementById("formEdit").style.display = "flex";
  document.getElementById("divList").style.display = "none";

  fillFormEdit(mediaId);
}

function closeFormEdit() {
  document.getElementById("buttonOpenFormCreate").style.display = "inline-block";
  document.getElementById("formEdit").style.display = "none";
  document.getElementById("divList").style.display = "grid";

  clearForm("formEdit");
}

function resetFormCreate() {
  closeFormCreate();
}

function createUniqueId(title) {
  return title.toLowerCase().match(/[a-z0-9]+/g).join("-") + "_" + String(Date.now());
}

function submitFormCreate(event) {
  event.preventDefault();
  
  const title_element = event.target["title"];
  const cover_element = event.target["cover"];
  const video_element = event.target["video"];
  
  const title = title_element.value.trim();
  const cover = cover_element.value.trim();
  const video = video_element.value.trim();
  
  if (!title || !cover || !video) {
    return;
  }

  const exist = checkMediaExist({
    title,
    cover,
    video,
  });

  if (exist) {
    return;
  }

  const id = createUniqueId(title);
 
  addMedia({
    id,
    title,
    cover,
    video,
  });

  title_element.value = "";
  cover_element.value = "";
  video_element.value = "";

  closeFormCreate();
}

function resetFormEdit() {
  closeFormEdit();
}

function submitFormEdit(event) {
  event.preventDefault();

  const mediaId = event.target["id"].value;
  const title = event.target["title"].value.trim();
  const cover = event.target["cover"].value.trim();
  const video = event.target["video"].value.trim();
  
  if(!title || !cover || !video) {
    return;
  }

  const id = createUniqueId(title);

  updateMedia(mediaId, {
    id,
    title,
    cover,
    video,
  })

  closeFormEdit();
}

function createDivMedia(media) {
  const {
    id,
    title,
    cover,
    video,
  } = media;

  const divMedia_element = document.createElement("div");
  const h3_element = document.createElement("h3");
  const img_element = document.createElement("img");
  const buttonRemove_element = document.createElement("button");
  const buttonPlay = document.createElement("button");
  const buttonEdit_element = document.createElement("button");

  const divButtons = document.createElement("div");

  divButtons.className = "actions";

  
  divMedia_element.id = id;

  divMedia_element.className = "item";
  
  buttonRemove_element.innerText = "Remover";
  buttonRemove_element.onclick = () => removeMedia(id);
  
  buttonPlay.innerText = "Video";
  buttonPlay.onclick = () => handlePlay(video);

  buttonEdit_element.innerText = "Editar";
  buttonEdit_element.onclick = () => openFormEdit(id);
  
  
  h3_element.id = "title";
  img_element.id = "cover";
  
  h3_element.innerText = title;
  img_element.src = cover;
  
  
  divButtons.append(buttonRemove_element, buttonPlay, buttonEdit_element);

  divMedia_element.append(h3_element, img_element, divButtons);

  return divMedia_element;
};

function clearForm(formId) {
  const formCreate_element = document.getElementById(formId);

  const titleInput_element = formCreate_element.querySelector("#title");
  const coverInput_element = formCreate_element.querySelector("#cover");
  const videoInput_element = formCreate_element.querySelector("#video");

  titleInput_element.value = "";
  coverInput_element.value = "";
  videoInput_element.value = "";
}

function fillFormEdit(mediaId) {
  const {
    id,
    title,
    cover,
    video,
  } = mediaList.find(media => media.id === mediaId);

  const formEdit_element = document.getElementById("formEdit");

  const idInput_element = formEdit_element.querySelector("#id");
  const titleInput_element = formEdit_element.querySelector("#title");
  const coverInput_element = formEdit_element.querySelector("#cover");
  const videoInput_element = formEdit_element.querySelector("#video");

  idInput_element.value = id;
  titleInput_element.value = title;
  coverInput_element.value = cover;
  videoInput_element.value = video;
}

function checkMediaExist(mediaToCheck) {
  if (mediaList.length === 0) {
    return false;
  }

  return mediaList.some((media) => {
    if(media.title === mediaToCheck.title) { return true }

    if(media.cover === mediaToCheck.cover) { return true }

    if(media.video === mediaToCheck.video) { return true }
  }); 
}


function handlePlay(video) {
  const div_element = document.getElementById("video")
  const iframe_element = document.createElement("iframe");
  const videoUrl = video.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
  
  iframe_element.src = videoUrl;

  div_element.innerHTML = "";

  div_element.appendChild(iframe_element);
}