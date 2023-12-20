// function addMovie() {
//   var favoriteMovie = document.getElementById("movie").value;
//   var moviesListElement = document.getElementById("moviesList");

//   moviesListElement.innerHTML = moviesListElement.innerHTML + "<img src=" + favoriteMovie + ">";

//   document.getElementById("movie").value = "";
// }

addEventListener("submit", (event) => {
  event.preventDefault();

  const titleInput_element = event.target["mediaTitle"];
  const coverInput_element = event.target["mediaCover"];
  const videoInput_element = event.target["mediaVideo"];
  
  const titleValue = titleInput_element.value;
  const coverValue = coverInput_element.value;
  const videoValue = videoInput_element.value;

  if (!titleValue || !coverValue || !videoValue) {
    return;
  }
  
  const mediaList_element = document.getElementById("mediaList");

  const div = document.createElement("div");
  const h3_element = document.createElement("h3");
  const img_element = document.createElement("img");
  const iframe_element = document.createElement("iframe");
  
  const urlVideo = videoValue.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")
  
  h3_element.innerText = titleValue;
  img_element.src = coverValue;
  iframe_element.src = urlVideo;

  div.append(h3_element, img_element, iframe_element);

  mediaList_element.append(div);

  titleInput_element.value = "";
  coverInput_element.value = "";
  videoInput_element.value = "";
});