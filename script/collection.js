import collection_list from "./collection-database.js";
import flavor_list from "./interest_database.js";

const LOCAL_STORAGE_CART_KEY = "icyco_cart";
let cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || [];

document.addEventListener("DOMContentLoaded", () => {
      displayFlavorFilter();
      displayCartItems();
      handleQuantityButtonsInCart();
      createSearchBar();

      const falvor_id = getQueryParam("flavor");

      if (falvor_id) {
            filterProducts(falvor_id);
      } else {
            displayProducts(collection_list);
      }
});

function displayProducts(products) {
      let productsSection = document.querySelector(".products-box");
      if (productsSection) {
            productsSection.innerHTML = "";
      }

      if (products == '') {
            productsSection.innerHTML = `
              <div class="no-product-container">
                  <h1 class="no-product-heading">No Product Found</h1>
                  <img src="images/product-not-found.png" alt="No products available" class="no-product-image">
                  <p class="no-product-text">We're sorry, but it seems we can't find the product you're looking for. Try searching for another flavor!</p>
              </div>
          `;
      }

      products.forEach((product) => {
            let box = document.createElement("div");
            let flavorName = flavor_list.find((f) => f.id === product.flavor_id)?.name;

            box.setAttribute("class", "box");
            box.setAttribute("id", product.id);

            box.innerHTML = `
              <div class="image-wrapper">
                  <div class="off">-${product.off}%</div>
                  <img src="${product.image}" alt="">
                  <div class="cat-label">${flavorName}</div>
                  <div class="book-actions">
                      <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" onclick="toggleWishlist('${product.id}')">
                          <i class="fa fa-heart"></i>
                      </button>
                      <div class="quick-view-icon">
                          <i class="fas fa-eye"></i>
                      </div>
                  </div>
              </div>
              <div class="name-price">
                  <div class="name">${product.name}</div>
                  <div class="price">$${product.price}</div>
              </div>
              <div class="description">${product.description}</div>
              <div class="qty">
                  <span class="decrease">-</span>
                  <span class="pcs">1</span>
                  <span class="increase">+</span>
              </div>`;

            let addToCartButton = document.createElement("button");
            let existingCartItem = cartItems.find((item) => item?.itemId == product.id);
            addToCartButton.textContent = existingCartItem
                  ? "Already in the cart - Add again?"
                  : "Add to Cart";

            addToCartButton.addEventListener("click", (e) => {
                  addToCart(e);
            });

            box.appendChild(addToCartButton);

            box.querySelector(".quick-view-icon").addEventListener("click", () => {
                  showQuickView(product);
            });

            productsSection?.appendChild(box);
      });
}

function displayFlavorFilter() {
      let flavorFilterSection = document.querySelector(".categories-wrapper");

      // Create the "All" button
      let allButton = document.createElement("button");
      allButton.setAttribute("id", "all");
      allButton.setAttribute("class", "active");
      allButton.textContent = "All";
      flavorFilterSection?.appendChild(allButton);

      allButton.addEventListener("click", () => {
            flavorFilterSection?.querySelector(".active")?.classList.remove("active");
            allButton.classList.add("active");
            filterProducts("all");

      });

      // Create buttons for each flavor
      flavor_list.forEach((flavor) => {
            let button = document.createElement("button");
            button.setAttribute("id", flavor.id);
            button.textContent = flavor.name;

            button.addEventListener("click", () => {
                  flavorFilterSection?.querySelector(".active")?.classList.remove("active");
                  button.classList.add("active");
                  filterProducts(flavor.id);
            });

            flavorFilterSection?.appendChild(button);
      });

      // Automatically activate the flavor from URL if it exists
      const flavorFromURL = getQueryParam("flavor");
      if (flavorFromURL) {
            let flavorButton = flavorFilterSection.querySelector(
                  `button[id='${flavorFromURL}']`
            );
            if (flavorButton) {
                  flavorFilterSection.querySelector(".active")?.classList.remove("active");
                  flavorButton.classList.add("active");
                  filterProducts(flavorFromURL); // Call filterProducts with the ID from URL
            }
      }
}

function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
}

function filterProducts(id) {
      console.log("Filtering by flavor_id:", id); // Add this line to track filtering
      let productsToDisplay = collection_list;

      if (id !== "all") {
            productsToDisplay = collection_list.filter(
                  (product) => product.flavor_id === id
            );
            console.log("Filtered products:", productsToDisplay); // Add this line to track filtered products
      }

      displayProducts(productsToDisplay);
}

function showToast(message) {
      const toastContainer = document.getElementById("toast-container");
      const toast = document.createElement("div");
      toast.classList.add("toast");
      toast.textContent = message;
      toastContainer.appendChild(toast);
      setTimeout(() => {
            toast.remove();
      }, 5500);
}

function addToCart(e) {
      let cartItemId = e.target.parentElement.getAttribute("id");

      let existingCartItem = cartItems.find((item) => item?.itemId == cartItemId);

      let item = collection_list.find((item) => item.id == cartItemId);
      let pcs = e.target.parentElement.querySelector(".pcs").textContent;
      let amount = item.price * pcs;

      if (pcs == 0) {
            showToast("Please select the number of cups you want!");
            return;
      }
      if (existingCartItem) {
            existingCartItem.pcs = parseInt(existingCartItem.pcs) + parseInt(pcs);
            existingCartItem.amount = existingCartItem.pcs * item.price;
            showToast(
                  `${pcs} more ${item.name} ice cream/s successfully added to the cart!`
            );
      } else {
            cartItems.push({
                  itemId: cartItemId,
                  pcs: pcs,
                  amount: amount,
            });
            showToast(
                  `${pcs} ${item.name} ice cream/s successfully added to the cart!`
            );
            e.target.textContent = "Already in the cart - Add again?";
      }
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));

      displayCartItems();
}

function handleRemoveButtonInCart() {
      let removeBtns = document.querySelectorAll(".remove-cart-item-btn");
      removeBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                  cartItems = cartItems.filter(
                        (item) =>
                              item?.itemId != btn.parentElement.parentElement.getAttribute("id")
                  );
                  const productBox = document.querySelector(
                        `.box[id='${btn.parentElement.parentElement.getAttribute("id")}']`
                  );
                  if (productBox) {
                        const addToCartButton = productBox.querySelector("button");
                        addToCartButton.textContent = "Add to Cart";
                  }
                  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
                  displayCartItems();
            });
      });
}

function displayCartItems() {
      if (cartItems.length != 0) {
            document.querySelector(".empty-cart").classList.remove("active");
            document.querySelector(".no-empty-cart").classList.add("active");

      } else {
            document.querySelector(".empty-cart").classList.add("active");
            document.querySelector(".no-empty-cart").classList.remove("active");

      }

      const cartUlList = document.querySelector(".cart-list-items");
      cartUlList.innerHTML = "";

      let subtotal = 0,
            noOfItems = 0;

      cartItems.map((ci) => {
            let itemLi = document.createElement("li");
            itemLi.setAttribute("id", ci.itemId);

            let product = collection_list.find((p) => p.id == ci.itemId); // Move this line here

            if (product) {
                  itemLi.innerHTML = `
                                                      <img src="${product.image}" alt="">
                                                      <div class="text">
                                                                        <span class="name">${product.name}</span>
                                                                        <div class="qty qtycart">
                                                                              <span class="decrease decreasecart">-</span>
                                                                              <span class="pcs pcscart">${ci.pcs}</span>
                                                                              <span class="increase increasecart">+</span>
                                                                        </div>
                                                                        <div class="price">$${ci.amount}</div>
                                                                        <i class="fa fa-trash remove-cart-item-btn" aria-hidden="true"></i>
                                                            </div>
                                                            
                                                `;

                  cartUlList.appendChild(itemLi);
                  handleRemoveButtonInCart();

                  subtotal += Number.parseFloat(ci.amount);
                  noOfItems += Number.parseInt(ci.pcs);
            } else {
                  console.error(`Product with ID ${ci.itemId} not found`);
            }
      });

      document.querySelector(".sub-total").textContent = `$${subtotal.toFixed(2)}`;
      document.querySelector(".no-of-cart-items").textContent = noOfItems;
}

function handleQuantityButtonsInProductCard() {
      const productsBox = document.querySelector(".products-box");
      if (!productsBox) return;
      productsBox.addEventListener("click", (e) => {
            if (e.target.classList.contains("increase")) {
                  const qtySpan = e.target.previousElementSibling;
                  let currentQty = parseInt(qtySpan.textContent);
                  qtySpan.textContent = currentQty + 1;

            }
            if (e.target.classList.contains("decrease")) {
                  const qtySpan = e.target.nextElementSibling;
                  let currentQty = parseInt(qtySpan.textContent);
                  if (currentQty > 1) {
                        qtySpan.textContent = currentQty - 1;

                  }
            }
      });
}
handleQuantityButtonsInProductCard();

function handleQuantityButtonsInCart() {
      const cartList = document.querySelector(".cart-list-items");
      function updateSubtotal() {
            const subtotalElement = document.querySelector(".sub-total");
            const subtotal = cartItems.reduce((acc, item) => acc + item.amount, 0);
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      }

      cartList.addEventListener("click", (e) => {
            const itemId = e.target.closest("li").getAttribute("id");
            let cartItem = cartItems.find((item) => item.itemId == itemId);

            if (e.target.classList.contains("increase")) {
                  const qtySpan = e.target.previousElementSibling;
                  let currentQty = parseInt(qtySpan.textContent);
                  qtySpan.textContent = currentQty + 1;
                  cartItem.pcs = currentQty + 1;
                  cartItem.amount =
                        cartItem.pcs * collection_list.find((p) => p.id == itemId).price;

                  const priceElement = e.target.closest("li").querySelector(".price");
                  priceElement.textContent = `$${cartItem.amount.toFixed(2)}`;

                  const textQtyElement = e.target.closest("li").querySelector(".text .qty");
                  textQtyElement.textContent = cartItem.pcs;

                  localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));

                  updateSubtotal();
            }

            if (e.target.classList.contains("decrease")) {
                  const qtySpan = e.target.nextElementSibling;
                  let currentQty = parseInt(qtySpan.textContent);
                  if (currentQty > 1) {
                        qtySpan.textContent = currentQty - 1;
                        cartItem.pcs = currentQty - 1;
                        cartItem.amount =
                              cartItem.pcs * collection_list.find((p) => p.id == itemId).price;

                        const priceElement = e.target.closest("li").querySelector(".price");
                        priceElement.textContent = `$${cartItem.amount.toFixed(2)}`;

                        const textQtyElement = e.target
                              .closest("li")
                              .querySelector(".text .qty");
                        textQtyElement.textContent = cartItem.pcs;

                        localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));

                        updateSubtotal();
                  }
            }
      });
}

function createSearchBar() {
      const searchBarContainer = document.querySelector(".search-container");

      // Check if the search bar already exists
      if (document.getElementById("search-bar")) return;

      // Create the search bar only if it doesn't already exist
      const searchBar = document.createElement("input");
      searchBar.setAttribute("type", "text");
      searchBar.setAttribute("id", "search-bar");
      searchBar.setAttribute("placeholder", "Search for flavors...");
      searchBarContainer.appendChild(searchBar);

      // Check if the search button already exists
      if (document.getElementById("search-btn")) return;

      // Create the search button only if it doesn't already exist
      const searchButton = document.createElement("button");
      searchButton.setAttribute("id", "search-btn");
      searchButton.innerText = "Search";
      searchBarContainer.appendChild(searchButton);

      // Attach event listener for the search button
      searchButton.addEventListener("click", () => {
            const query = searchBar.value.toLowerCase();
            const filteredProducts = collection_list.filter((product) => {
                  const flavorName = flavor_list
                        .find((f) => f.id === product.flavor_id)
                        ?.name.toLowerCase();
                  return (
                        product.name.toLowerCase().includes(query) || flavorName.includes(query)
                  );
            });
            displayProducts(filteredProducts);
      });

      // Handle input event for live search
      handleSearchInput();
}

function handleSearchInput() {
      const searchInput = document.getElementById("search-bar");
      searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            const filteredProducts = collection_list.filter((product) => {
                  const flavorName = flavor_list
                        .find((f) => f.id === product.flavor_id)
                        ?.name.toLowerCase();
                  return (
                        product.name.toLowerCase().includes(query) || flavorName.includes(query)
                  );

            });
            displayProducts(filteredProducts);
      });
}

function showQuickView(product) {
      const overlay = document.getElementById("overlay");

      // Set the inner HTML of overlay with the product details in two sections
      overlay.innerHTML = `
          <div class="quick-view-popup">
              <span class="close-btn">&times;</span>
              <div class="popup-content">
                  <!-- Left section for the image -->
                  <div class="left-section">
                      <img src="${product.image}" alt="${product.name}" class="quick-view-image"/>
                  </div>
                  <!-- Right section for the text content -->
                  <div class="right-section">
                      <h2>${product.name}</h2>
                      <p>${product.description}</p>
                      <div class="price">Price: $${product.price}</div>
                  </div>
              </div>
          </div>
      `;

      // Show the overlay
      overlay.style.display = "flex";

      // Close popup on clicking the close button
      overlay.querySelector(".close-btn").addEventListener("click", () => {
            overlay.style.display = "none";
      });

      // Close popup when clicking outside of it
      overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                  overlay.style.display = "none";
            }
      });
}

function openModal() {
      document.getElementById("quickViewModal").style.display = "flex";
}

function closeModal() {
      document.getElementById("quickViewModal").style.display = "none";
}

// Close modal when clicking outside content
window.onclick = function (event) {
      const modal = document.getElementById("quickViewModal");
      if (event.target === modal) {
            modal.style.display = "none";
      }
};

// Admin Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const adminBtn = document.getElementById('adminBtn');
    const adminPopup = document.getElementById('adminPopup');
    const closeBtn = document.querySelector('.close-btn');
    const addBookForm = document.getElementById('addBookForm');

    // Show popup when admin button is clicked
    adminBtn.addEventListener('click', function() {
        adminPopup.style.display = 'flex';
    });

    // Close popup when close button is clicked
    closeBtn.addEventListener('click', function() {
        adminPopup.style.display = 'none';
    });

    // Close popup when clicking outside the popup content
    adminPopup.addEventListener('click', function(e) {
        if (e.target === adminPopup) {
            adminPopup.style.display = 'none';
        }
    });

    // Handle form submission
    addBookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const bookName = document.getElementById('bookName').value;
        const bookImage = document.getElementById('bookImage').value;
        const bookDescription = document.getElementById('bookDescription').value;

        // Create new book object
        const newBook = {
            id: Date.now().toString(), // Generate unique ID
            name: bookName,
            image: bookImage,
            description: bookDescription,
            price: 0, // Default price
            off: 0, // Default discount
            flavor_id: 'default' // Default flavor
        };

        // Add the new book to the collection
        collection_list.push(newBook);
        
        // Refresh the display
        displayProducts(collection_list);
        
        // Reset form and close popup
        addBookForm.reset();
        adminPopup.style.display = 'none';
        
        // Show success message
        showToast('Book added successfully!');
    });
});

function createBookCard(book) {
    return `
        <div class="book-card">
            <div class="book-image">
                <img src="${book.image}" alt="${book.title}">
                <div class="book-actions">
                    <button class="wishlist-btn" onclick="addToWishlist(${JSON.stringify(book).replace(/"/g, '&quot;')})">
                        <i class="fa fa-heart"></i>
                    </button>
                    <button class="add-to-cart-btn" onclick="addToCart('${book.id}')">
                        <i class="fa fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">${book.author}</p>
                <p class="price">$${book.price}</p>
            </div>
        </div>
    `;
}

// Make wishlist functions globally accessible
window.isInWishlist = function(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist.some(item => item.id === productId);
}

window.toggleWishlist = function(productId) {
    const product = collection_list.find(item => item.id === productId);
    if (!product) return;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isAlreadyInWishlist = wishlist.some(item => item.id === productId);

    if (isAlreadyInWishlist) {
        wishlist = wishlist.filter(item => item.id !== productId);
        showToast('Removed from wishlist!');
    } else {
        wishlist.push(product);
        showToast('Added to wishlist!');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    
    // Update the heart icon
    const wishlistBtn = document.querySelector(`#${productId} .wishlist-btn i`);
    if (wishlistBtn) {
        wishlistBtn.classList.toggle('active');
    }
}

window.updateWishlistCount = function() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Initialize wishlist count when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
});
