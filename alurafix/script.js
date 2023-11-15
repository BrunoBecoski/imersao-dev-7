var moviesList = [
  "./assets/school_rock.jpg",
  "./assets/arrival.jpg",
  "./assets/spiderman_into_the_spiderverse.jpg",
  "./assets/10_things_i_hate_about_you.jpg",
  "./assets/matrix.jpg"
];

for(var i = 0; i < moviesList.length; i++) {
  window.document.write("<img src=" + moviesList[i] + ">");
}