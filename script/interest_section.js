import genres from "./interest_database.js";

document.addEventListener("DOMContentLoaded", function () {
  const genresContainer = document.querySelector(".genres-container");
  
  genresContainer.innerHTML = genres
    .map(
      (genre) => `
        <a href="products.html?genre=${genre.id}" class="genre-item">
          <img src="${genre.image}" alt="${genre.name}">
          <h3>${genre.name}</h3>
        </a>
      `
    )
    .join("");
});
