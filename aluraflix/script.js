// function addMovie() {
//   var favoriteMovie = document.getElementById("movie").value;
//   var moviesListElement = document.getElementById("moviesList");

//   moviesListElement.innerHTML = moviesListElement.innerHTML + "<img src=" + favoriteMovie + ">";

//   document.getElementById("movie").value = "";
// }

addEventListener("submit", (event) => {
  event.preventDefault();
  
  const titleInput_element = event.target["inputTitle"];
  const coverInput_element = event.target["inputCover"];
  const videoInput_element = event.target["inputVideo"];

  const titleValue = titleInput_element.value.trim();
  const coverValue = coverInput_element.value.trim();
  const videoValue = videoInput_element.value.trim();

  if (!titleValue || !coverValue || !videoValue) {
    return;
  }
  
  const divList_element = document.getElementById("divList");

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

  const urlVideo = videoValue.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")
  
  h3_element.id = "title";
  img_element.id = "cover";
  iframe_element.id = "video";

  h3_element.innerText = titleValue;
  img_element.src = coverValue;
  iframe_element.src = urlVideo;

  div_element.append(buttonRemove_element, buttonEdit_element, h3_element, img_element, iframe_element);

  divList_element.append(div_element);

  titleInput_element.value = "";
  coverInput_element.value = "";
  videoInput_element.value = "";

  handleHideForm();
});

function handleShowForm() {
  document.getElementById("buttonShowForm").style.display = "none";
  document.getElementById("formMedia").style.display = "block";
  document.getElementById("divList").style.display = "none";
}

function handleHideForm() {
  document.getElementById("buttonShowForm").style.display = "inline-block";
  document.getElementById("formMedia").style.display = "none";
  document.getElementById("divList").style.display = "block";

  document.getElementById("inputTitle").value = "";
  document.getElementById("inputCover").value = "";
  document.getElementById("inputVideo").value = "";
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
    
  document.getElementById("inputTitle").value = title;
  document.getElementById("inputCover").value = cover;
  document.getElementById("inputVideo").value = video;

  handleShowForm();
}