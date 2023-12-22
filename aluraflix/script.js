// function addMovie() {
//   var favoriteMovie = document.getElementById("movie").value;
//   var moviesListElement = document.getElementById("moviesList");

//   moviesListElement.innerHTML = moviesListElement.innerHTML + "<img src=" + favoriteMovie + ">";

//   document.getElementById("movie").value = "";
// }

addEventListener("submit", (event) => {
  event.preventDefault();
  
  const mediaForm_element = event.target;
  const buttonShow_element = document.getElementById("buttonShow");

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

  const id = titleValue.toLowerCase().replaceAll(/[^a-z0-9]+/ig, "_");

  div_element.id = id;

  buttonRemove_element.onclick = () => handleRemove(id);
  buttonRemove_element.innerText = "Remover";

  const urlVideo = videoValue.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")
  
  h3_element.innerText = titleValue;
  img_element.src = coverValue;
  iframe_element.src = urlVideo;

  div_element.append( buttonRemove_element, h3_element, img_element, iframe_element);

  divList_element.append(div_element);

  titleInput_element.value = "";
  coverInput_element.value = "";
  videoInput_element.value = "";

  buttonShow_element.style = "block";
  mediaForm_element.style.display = "none";
});

function handleRemove(id) {
  document.getElementById(id).remove();
}

function handleShow() {
  const buttonShow_element = document.getElementById("buttonShow");
  const formMedia_element = document.getElementById("formMedia");

  formMedia_element.style.display = "block";
  buttonShow_element.style.display = "none";
}