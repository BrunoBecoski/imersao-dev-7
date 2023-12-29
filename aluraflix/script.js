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

formCreate_element.addEventListener("reset", (event) => {
  event.target["title"].value = "";
  event.target["cover"].value = "";
  event.target["video"].value = "";

  document.getElementById("buttonShowFormCreate").style.display = "inline-block";
  document.getElementById("formCreate").style.display = "none";
  document.getElementById("divList").style.display = "block";
});

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
  buttonRemove_element.onclick = () => document.getElementById(id).remove();

  buttonEdit_element.innerText = "Editar";
  buttonEdit_element.onclick = () => {
    const formEdit_element = document.getElementById("formEdit");
    formEdit_element.style.display = "block";
    document.getElementById("divList").style.display = "none";

    const divMedia_element = document.getElementById(id);

    const titleValue = divMedia_element.querySelector("#title").innerText;
    const coverValue = divMedia_element.querySelector("#cover").src;
    const videoValue = divMedia_element.querySelector("#video").src;
   
    const titleInput_element = formEdit_element.querySelector("#title");
    const coverInput_element = formEdit_element.querySelector("#cover");
    const videoInput_element = formEdit_element.querySelector("#video");

    titleInput_element.value = titleValue;
    coverInput_element.value = coverValue;
    videoInput_element.value = videoValue;
  };

  const videoUrl = videoValue.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
  
  h3_element.id = "title";
  img_element.id = "cover";
  iframe_element.id = "video";

  h3_element.innerText = titleValue;
  img_element.src = coverValue;
  iframe_element.src = videoUrl;

  div_element.append(buttonRemove_element, buttonEdit_element, h3_element, img_element, iframe_element);

  const divList_element = document.getElementById("divList");

  divList_element.append(div_element);
  
  title_element.value = "";
  cover_element.value = "";
  video_element.value = "";

  document.getElementById("buttonShowFormCreate").style.display = "inline-block";
  document.getElementById("formCreate").style.display = "none";
  document.getElementById("divList").style.display = "block";
});


const formEdit_element = document.getElementById("formEdit");

formEdit_element.addEventListener("reset", (event) => {
  event.target["title"] = "";
  event.target["cover"] = "";
  event.target["video"] = "";

  event.target.style.display = "none";

  document.getElementById("divList").style.display = "block";
});

formEdit_element.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = event.target["title"].value;
  const cover = event.target["cover"].value;
  const video = event.target["video"].value;

  console.log("title", title);
  console.log("cover", cover);
  console.log("video", video);
});