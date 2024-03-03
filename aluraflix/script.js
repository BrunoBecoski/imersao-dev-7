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

  alert('Mídia adiciona com sucesso.')
}

function removeMedia(mediaId) {
  mediaList = mediaList.filter(media => media.id !== mediaId);

  setLocalStorage();
  renderMedias();

  alert("Mídia removida com sucesso.")
}

function updateMedia(mediaId, media) {
  const index = mediaList.findIndex((media) => media.id === mediaId);

  mediaList[index] = {
    ...media,
  }

  setLocalStorage();
  renderMedias();

  alert('Mídia atualiza com sucesso.')

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
  const image_element = event.target["image"];
  const video_element = event.target["video"];
  
  const title = title_element.value.trim();
  const image = image_element.value.trim();
  const video = video_element.value.trim();
  
  if (!title || !image || !video) {
    alert('Valores inválidos')
    return;
  }

  const exist = checkMediaExist({
    title,
    image,
    video,
  });

  if (exist) {
    alert('Mídia já foi adicionada anteriormente.')
    return;
  }

  const id = createUniqueId(title);
 
  addMedia({
    id,
    title,
    image,
    video,
  });

  title_element.value = "";
  image_element.value = "";
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
  const image = event.target["image"].value.trim();
  const video = event.target["video"].value.trim();
  
  if(!title || !image || !video) {
    return;
  }

  const id = createUniqueId(title);

  updateMedia(mediaId, {
    id,
    title,
    image,
    video,
  })

  closeFormEdit();
}

function createDivMedia(media) {
  const {
    id,
    title,
    image,
    video,
  } = media;

  const divMedia_element = document.createElement("div");
  divMedia_element.id = id;
  divMedia_element.className = "item";
    
  const h3_element = document.createElement("h3");
  h3_element.id = "title";
  h3_element.innerText = title;

  const img_element = document.createElement("img");
  img_element.id = "image";
  img_element.src = image;

  const divCover_element = document.createElement("div");
  divCover_element.className = "cover";

  const buttonPlay_element = document.createElement("button");
  buttonPlay_element.className = "play"
  buttonPlay_element.title = "Reproduzir"
  buttonPlay_element.onclick = () => handlePlay(video);
  
  const buttonRemove_element = document.createElement("button");
  buttonRemove_element.className = "remove";
  buttonRemove_element.title = "Remover";
  buttonRemove_element.onclick = () => removeMedia(id);

  const buttonEdit_element = document.createElement("button");
  buttonEdit_element.className = "edit";
  buttonEdit_element.title = "Editar";
  buttonEdit_element.onclick = () => openFormEdit(id);

  divCover_element.append(img_element, buttonRemove_element, buttonPlay_element, buttonEdit_element);
  divMedia_element.append(h3_element, divCover_element);

  return divMedia_element;
};

function clearForm(formId) {
  const formCreate_element = document.getElementById(formId);

  const titleInput_element = formCreate_element.querySelector("#title");
  const imageInput_element = formCreate_element.querySelector("#image");
  const videoInput_element = formCreate_element.querySelector("#video");

  titleInput_element.value = "";
  imageInput_element.value = "";
  videoInput_element.value = "";
}

function fillFormEdit(mediaId) {
  const {
    id,
    title,
    image,
    video,
  } = mediaList.find(media => media.id === mediaId);

  const formEdit_element = document.getElementById("formEdit");

  const idInput_element = formEdit_element.querySelector("#id");
  const titleInput_element = formEdit_element.querySelector("#title");
  const imageInput_element = formEdit_element.querySelector("#image");
  const videoInput_element = formEdit_element.querySelector("#video");

  idInput_element.value = id;
  titleInput_element.value = title;
  imageInput_element.value = image;
  videoInput_element.value = video;
}

function checkMediaExist(mediaToCheck) {

  console.log(mediaToCheck)
  if (mediaList.length === 0) {
    return false;
  }

  return mediaList.some((media) => {
    if(media.title === mediaToCheck.title) {
      alert('Título já foi adicionada anteriormente.');
      return true;
    }

    if(media.image === mediaToCheck.image) {
      alert('Imagem já foi adicionada anteriormente.');
      return true;
    }

    if(media.video === mediaToCheck.video) {
      alert('Vídeo já foi adicionada anteriormente.');
      return true;
    }
  }); 
}


function handlePlay(video) {
  handleOpenModal();

  const modal_element = document.getElementById("modal")
  const iframe_element = document.createElement("iframe");
  const videoUrl = video.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
  
  iframe_element.src = videoUrl;

  modal_element.appendChild(iframe_element);

}

function handleOpenModal() {
  const body_element = document.getElementById("root");
  body_element.style.overflow = "hidden";
  
  const modal_element = document.getElementById("modal");
  modal_element.style.display = "block";
  modal_element.title = "Fechar vídeo";
  
  addEventListener('keydown', closeModalWithKeyboard)
}

function closeModalWithKeyboard(event) {
  if (event.code === 'Escape') {
    handleCloseModal();
  }
}

function handleCloseModal() {
  removeEventListener('keydown', closeModalWithKeyboard);
  
  const body_element = document.getElementById("root");
  body_element.style.overflow = "auto";
  
  const modal_element = document.getElementById("modal");
  modal_element.innerHTML = "";
  modal_element.style.display = "none";
  
}
