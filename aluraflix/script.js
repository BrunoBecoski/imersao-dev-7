// function addMovie() {
//   var favoriteMovie = document.getElementById("movie").value;
//   var moviesListElement = document.getElementById("moviesList");

//   moviesListElement.innerHTML = moviesListElement.innerHTML + "<img src=" + favoriteMovie + ">";

//   document.getElementById("movie").value = "";
// }

function handleShowFormCreate() {
  document.getElementById("buttonShowFormCreate").style.display = "none";
  document.getElementById("formCreate").style.display = "block";
  document.getElementById("divList").style.display = "none";
}

const formCreate_element = document.getElementById("formCreate");

formCreate_element.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const title_element = event.target["title"];
  const cover_element = event.target["cover"];
  const video_element = event.target["video"];
  
  const titleValue = title_element.value.trim();
  const coverValue = cover_element.value.trim();
  const videoValue = video_element.value.trim();
  
  if (!titleValue || !coverValue || !videoValue) {
    return;
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

  const divList_element = document.getElementById("divList");
  console.log(divList_element);
  
  divList_element.append(div_element);
  
  title_element.value = "";
  cover_element.value = "";
  video_element.value = "";

  document.getElementById("buttonShowFormCreate").style.display = "inline-block";
  document.getElementById("formCreate").style.display = "none";
  document.getElementById("divList").style.display = "block";
})

formCreate_element.addEventListener("reset", (event) => {
  event.target["title"].value = "";
  event.target["cover"].value = "";
  event.target["video"].value = "";

  document.getElementById("buttonShowFormCreate").style.display = "inline-block";
  document.getElementById("formCreate").style.display = "none";
  document.getElementById("divList").style.display = "block";
})

// function setMediaList(divMedia_element) {
//   const divList_element = document.getElementById("divList");
//   divList_element.append(divMedia_element);
// }

// function handleSubmitEdit(id) {
//   handleSubmit();

//   const div_element = document.getElementById(id);
//   div_element.remove();
// }

// function createDivMedia(title, cover, video) {
  // 

//   return div_element;
// }

// function getFormInputs() {
//   const titleInput_element = document.getElementById("inputTitle");
//   const coverInput_element = document.getElementById("inputCover");
//   const videoInput_element = document.getElementById("inputVideo");

//   return {
//     titleInput_element,
//     coverInput_element, 
//     videoInput_element,
//   }
// }

// function handleHideForm(type) {
//   document.getElementById("buttonShowForm").style.display = "inline-block";
//   document.getElementById("formMedia").style.display = "none";
//   document.getElementById("divList").style.display = "block";

//   if (type === "create") {
//     clearForm();
//     return;
//   }

//   if (type === "edit") {
//     return;
//   }
// }

// function clearForm() {
//   const {
//     titleInput_element,
//     coverInput_element, 
//     videoInput_element,
//   } = getFormInputs()

//   titleInput_element.value = "";
//   coverInput_element.value = ""; 
//   videoInput_element.value = "";
// }

// function handleRemoveMedia(id) {
//   document.getElementById(id).remove();
// }

// function handleEditMedia(id) {
//   const buttonCancel_element = document.getElementById("buttonCancel");
//   buttonCancel_element.onclick = () => handleHideForm("edit");

//   const buttonSubmitEdit_element = document.getElementById("buttonSubmitEdit");
//   buttonSubmitEdit_element.onclick = () => handleSubmitEdit(id);

//   const div_element = document.getElementById(id);

//   const title = div_element.querySelector("#title").innerText;
//   const cover = div_element.querySelector("#cover").src;
//   const video = div_element.querySelector("#video").src;

//   const {
//     titleInput_element,
//     coverInput_element, 
//     videoInput_element,
//   } = getFormInputs()
  
//   titleInput_element.value = title;
//   coverInput_element.value = cover;
//   videoInput_element.value = video;
  
//   changeButtonsForm("edit");
//   handleShowForm();
// }

// function changeButtonsForm(type) {
//   if (type === "create") {
//     document.getElementById("buttonsCreate").style.display = "block";
//     document.getElementById("buttonsEdit").style.display = "none";
//   }

//   if (type === "edit") {
//     document.getElementById("buttonsEdit").style.display = "block";
//     document.getElementById("buttonsCreate").style.display = "none";
//   }
// }