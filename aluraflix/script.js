// function addMovie() {
//   var favoriteMovie = document.getElementById("movie").value;
//   var moviesListElement = document.getElementById("moviesList");

//   moviesListElement.innerHTML = moviesListElement.innerHTML + "<img src=" + favoriteMovie + ">";

//   document.getElementById("movie").value = "";
// }

addEventListener("submit", (event) => {
  event.preventDefault();
  
  const title = event.target["mediaTitle"].value;
  const cover = event.target["mediaCover"].value;

  const mediaList_element = document.getElementById("mediaList");

  const title_element = document.createElement("h3");
  const cover_element = document.createElement("img");

  title_element.innerText = title;
  cover_element.src = cover;

  mediaList_element.append(title_element, cover_element);
});