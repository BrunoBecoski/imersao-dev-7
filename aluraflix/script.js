// function addMovie() {
//   var favoriteMovie = document.getElementById("movie").value;
//   var moviesListElement = document.getElementById("moviesList");

//   moviesListElement.innerHTML = moviesListElement.innerHTML + "<img src=" + favoriteMovie + ">";

//   document.getElementById("movie").value = "";
// }

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

const form_element = document.getElementById("form");
form_element.addEventListener("reset", resetForm);
form_element.addEventListener("submit", submitForm);

function openForm(id) { 
  if (id) {
    fillForm(id);
  }
  
  document.getElementById("mainHeader").style.display = "none";
  document.getElementById("form").style.display = "flex";
  document.getElementById("divList").style.display = "none";
} 

function resetForm() {
  document.getElementById("mainHeader").style.display = "flex";
  document.getElementById("form").style.display = "none";
  document.getElementById("divList").style.display = "flex";
}

function submitForm(event) {
  event.preventDefault();

  const id = event.target["id"].value;
  const title = event.target["title"].value.trim();
  const image = event.target["image"].value.trim();
  const video = event.target["video"].value.trim();

  let message = [];

  if(title === "") {
    message.push("Título inválido!");
  }

  if(image === "") {
    message.push("Imagem inválida!");
  }

  if(video === "") {
    message.push("Vídeo inválido!");
  }

  if(message.length > 0) {
    alert(message.toString().replaceAll(',', '\n'));
    return;
  }

  const checkMessage = checkMediaExist({
    id,
    title,
    image,
    video,
  });

  if(checkMessage.length > 0) {
    alert(checkMessage.toString().replaceAll(',', '\n'));
    return;
  }

  if (id) {
    updateMedia({
      id,
      title,
      image,
      video,
    });
  } else {
    createMedia({
      title,
      image,
      video,
    });
  } 
  
  event.target.reset();
}

function removeMedia(mediaToRemove) {
  const response = confirm("Remover: " + mediaToRemove.title);
  
  if (response) {
    mediaList = mediaList.filter(media => media.id !== mediaToRemove.id);
    
    setLocalStorage();
    renderMedias();
  }
}

function renderMedias(){
  const divList_element = document.getElementById("divList");

  divList_element.innerHTML = "";

  const mediaList_elements = mediaList.map(media => createDivMedia(media));

  mediaList_elements.forEach((media_element) => {
    divList_element.appendChild(media_element);
  })
}

function createUniqueId(title) {
  return title.toLowerCase().match(/[a-z0-9]+/g).join("-") + "_" + String(Date.now());
}

function createMedia({ title, image, video }) {
  const id = createUniqueId(title);
 
  const media = {
    id,
    title,
    image,
    video,
  }

  mediaList.push(media);
  
  setLocalStorage();
  renderMedias();

  alert("Mídia: " + title + " criada com sucesso!");
}

function updateMedia({ id, title, image, video }) {
  const newId = createUniqueId(title);

  const oldMedia = mediaList.find((media) => media.id === id);
  const newMedia = { id: newId, title, image, video };

  let message = [];
  let response = false;

  if (oldMedia.title !== newMedia.title) {
    message.push("Alterar título de: " + oldMedia.title + " para: " + newMedia.title);
  }

  if (oldMedia.image !== newMedia.image) {
    message.push("Alterar imagem de: " + oldMedia.image + " para: " + newMedia.image);
  }

  if (oldMedia.video !== newMedia.video) {
    message.push("Alterar video de: " + oldMedia.video + " para: " + newMedia.video);
  }

  if (message.length === 0) {
    alert("Nenhum valor alterado.");
  }

  if (message.length > 0) {
    response = confirm(message.toString().replaceAll(',', '\n \n'));
  }

  if (response) {
    const index = mediaList.findIndex((media) => media.id === oldMedia.id);
  
    mediaList[index] = { ...newMedia };
    
    setLocalStorage();
    renderMedias();
  }
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
  buttonRemove_element.onclick = () => removeMedia(media);

  const buttonEdit_element = document.createElement("button");
  buttonEdit_element.className = "edit";
  buttonEdit_element.title = "Editar";
  buttonEdit_element.onclick = () => openForm(id);

  divCover_element.append(img_element, buttonRemove_element, buttonPlay_element, buttonEdit_element);
  divMedia_element.append(h3_element, divCover_element);

  return divMedia_element;
};

function fillForm(mediaId) {
  const {
    id,
    title,
    image,
    video,
  } = mediaList.find(media => media.id === mediaId);

  const form_element = document.getElementById("form");

  const idInput_element = form_element.querySelector("#id");
  const titleInput_element = form_element.querySelector("#title");
  const imageInput_element = form_element.querySelector("#image");
  const videoInput_element = form_element.querySelector("#video");

  idInput_element.value = id;
  titleInput_element.value = title;
  imageInput_element.value = image;
  videoInput_element.value = video;
}

function checkMediaExist(mediaToCheck) {
  let mediaListToCheck = mediaList;

  if (mediaList.length === 0) {
    return false;
  }

  if (mediaToCheck.id !== "") {
    mediaListToCheck = mediaList.filter(media => media.id !== mediaToCheck.id);
  }

  let checkMessage = [];

  mediaListToCheck.forEach((media) => {
    if(media.title === mediaToCheck.title) {
      checkMessage.push("Título já foi adicionada anteriormente!");
    }

    if(media.image === mediaToCheck.image) {
      checkMessage.push("Imagem já foi adicionada anteriormente!");
    }

    if(media.video === mediaToCheck.video) {
      checkMessage.push("Vídeo já foi adicionada anteriormente!");
    }
  }); 

  return checkMessage;
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
