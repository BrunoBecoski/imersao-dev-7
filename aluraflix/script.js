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

function openFormCreate() { 
  clearForm("formCreate");

  document.getElementById("buttonOpenFormCreate").style.display = "none";
  document.getElementById("formCreate").style.display = "block";
  document.getElementById("divList").style.display = "none";
} 
  
function closeFormCreate() {
  document.getElementById("buttonOpenFormCreate").style.display = "inline-block";
  document.getElementById("formCreate").style.display = "none";
  document.getElementById("divList").style.display = "block";

  clearForm("formCreate");
}

function openFormEdit(mediaId) {
  document.getElementById("buttonOpenFormCreate").style.display = "none";
  document.getElementById("formEdit").style.display = "block";
  document.getElementById("divList").style.display = "none";

  fillFormEdit(mediaId);
}

function closeFormEdit() {
  document.getElementById("buttonOpenFormCreate").style.display = "inline-block";
  document.getElementById("formEdit").style.display = "none";
  document.getElementById("divList").style.display = "block";

  clearForm("formEdit");
}

function resetFormCreate() {
  closeFormCreate();
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

  const id = title.toLowerCase().replaceAll(/[^a-z0-9]+/ig, "_");

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

  const id = event.target["id"].value;
  const title = event.target["title"].value.trim();
  const cover = event.target["cover"].value.trim();
  const video = event.target["video"].value.trim();
  
  if(!title || !cover || !video) {
    return;
  }

  const videoUrl = video.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");

  const div_element = document.getElementById(id);

  div_element.querySelector("#title").innerText = title;
  div_element.querySelector("#cover").src = cover;
  div_element.querySelector("#video").src = videoUrl;
  
  closeFormEdit();
}

function addMedia(media) {   
  const exist = checkMediaExist(media);

  if (exist) {
    return;
  } else {
    mediaList.push(media);
    renderMedias();
  }
}

function removeMedia(mediaId) {
  mediaList = mediaList.filter(media => media.id !== mediaId);

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
  const iframe_element = document.createElement("iframe");
  const buttonRemove_element = document.createElement("button");
  const buttonEdit_element = document.createElement("button");

  divMedia_element.id = id;

  buttonRemove_element.innerText = "Remover";
  buttonRemove_element.onclick = () => removeMedia(id);

  buttonEdit_element.innerText = "Editar";
  buttonEdit_element.onclick = () => openFormEdit(id);
  
  const videoUrl = video.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
  
  h3_element.id = "title";
  img_element.id = "cover";
  iframe_element.id = "video";

  h3_element.innerText = title;
  img_element.src = cover;
  iframe_element.src = videoUrl;

  divMedia_element.append(buttonRemove_element, buttonEdit_element, h3_element, img_element, iframe_element);
  
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
    if(media.id === mediaToCheck.id) { return true }

    if(media.title === mediaToCheck.title) { return true }

    if(media.cover === mediaToCheck.cover) { return true }

    if(media.video === mediaToCheck.video) { return true }
  }); 
}