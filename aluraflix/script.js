// function addMovie() {
//   var favoriteMovie = document.getElementById("movie").value;
//   var moviesListElement = document.getElementById("moviesList");

//   moviesListElement.innerHTML = moviesListElement.innerHTML + "<img src=" + favoriteMovie + ">";

//   document.getElementById("movie").value = "";
// }

addEventListener("submit", (event) => {
  event.preventDefault();
  
  const divMedia_element = createDivMedia();

  if (!divMedia_element)  {
    return;
  }

  setMediaList(divMedia_element);

  const {
    titleInput_element,
    coverInput_element,
    videoInput_element, 
  } = getFormInputs();
    
  titleInput_element.value = "";
  coverInput_element.value = "";
  videoInput_element.value = "";

  handleHideForm();
});

function setMediaList(divMedia_element) {
  const divList_element = document.getElementById("divList");
  divList_element.append(divMedia_element);
}

function createDivMedia() {
  const {
    titleInput_element,
    coverInput_element, 
    videoInput_element,
  } = getFormInputs();

  const titleValue = titleInput_element.value.trim();
  const coverValue = coverInput_element.value.trim();
  const videoValue = videoInput_element.value.trim();
  
  if (!titleValue || !coverValue || !videoValue) {
    return 
  }
 
  const div_element = document.createElement("div");
  const h3_element = document.createElement("h3");
  const img_element = document.createElement("img");
  const iframe_element = document.createElement("iframe");
  const buttonRemove_element = document.createElement("button");
  const buttonEdit_element = document.createElement("button");

  const id = titleValue.toLowerCase().replaceAll(/[^a-z0-9]+/ig, "_");
  div_element.id = id;

  buttonRemove_element.innerText = "Remover";
  buttonRemove_element.onclick = () => handleRemoveMedia(id);

  buttonEdit_element.innerText = "Editar";
  buttonEdit_element.onclick = () => handleEditMedia(id);

  const videoUrl = videoValue.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
  
  h3_element.id = "title";
  img_element.id = "cover";
  iframe_element.id = "video";

  h3_element.innerText = titleValue;
  img_element.src = coverValue;
  iframe_element.src = videoUrl;

  div_element.append(buttonRemove_element, buttonEdit_element, h3_element, img_element, iframe_element);

  return div_element;
}

function getFormInputs() {
  const titleInput_element = document.getElementById("inputTitle");
  const coverInput_element = document.getElementById("inputCover");
  const videoInput_element = document.getElementById("inputVideo");

  return {
    titleInput_element,
    coverInput_element, 
    videoInput_element,
  }
}

function handleShowForm() {
  document.getElementById("buttonShowForm").style.display = "none";
  document.getElementById("formMedia").style.display = "block";
  document.getElementById("divList").style.display = "none";
}

function handleHideForm() {
  document.getElementById("buttonShowForm").style.display = "inline-block";
  document.getElementById("formMedia").style.display = "none";
  document.getElementById("divList").style.display = "block";

  const {
    titleInput_element,
    coverInput_element, 
    videoInput_element,
  } = getFormInputs()

  titleInput_element.value = "";
  coverInput_element.value = ""; 
  videoInput_element.value = "";
}

function handleRemoveMedia(id) {
  document.getElementById(id).remove();
}

function handleEditMedia(id) {
  const div_element = document.getElementById(id);

  div_element.remove();

  const title = div_element.querySelector("#title").innerText;
  const cover = div_element.querySelector("#cover").src;
  const video = div_element.querySelector("#video").src;

  const {
    titleInput_element,
    coverInput_element, 
    videoInput_element,
  } = getFormInputs()
  
  titleInput_element.value = title;
  coverInput_element.value = cover;
  videoInput_element.value = video;

  handleShowForm();
}