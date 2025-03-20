import interests from "./interest_database.js";

document.addEventListener("DOMContentLoaded", function () {
  const interestContainer = document.querySelector(".interest-container");
  interestContainer.innerHTML = flavors
    .map(
      (interest) => `
          <a href="products.html?interest=${interest.id}">
              <div class="interest-item">
                <img src="${interest.image}" alt="${interest.name}">
                <h3>${interest.name}</h3>
              </div>
          </a>
      `
    )
    .join("");
});
