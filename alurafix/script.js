function addMovie() {
  var favoriteMovie = document.getElementById("movie").value;
  var moviesListElement = document.getElementById("moviesList");

  moviesListElement.innerHTML = moviesListElement.innerHTML + "<img src=" + favoriteMovie + ">";

  document.getElementById("movie").value = "";
}