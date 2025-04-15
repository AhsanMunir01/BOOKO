// Wishlist functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to add item to wishlist
function addToWishlist(item) {
    if (!wishlist.some(i => i.id === item.id)) {
        wishlist.push(item);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showToast('Added to wishlist!');
        updateWishlistCount();
    }
}

// Function to remove item from wishlist
function removeFromWishlist(itemId) {
    wishlist = wishlist.filter(item => item.id !== itemId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showToast('Removed from wishlist!');
    updateWishlistCount();
    displayWishlistItems();
}

// Function to display wishlist items
function displayWishlistItems() {
    const wishlistContainer = document.querySelector('.wishlist-items');
    const emptyWishlist = document.querySelector('.empty-wishlist');
    
    if (wishlist.length === 0) {
        emptyWishlist.classList.add('active');
        wishlistContainer.innerHTML = '';
        return;
    }

    emptyWishlist.classList.remove('active');
    wishlistContainer.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <div class="price">$${item.price}</div>
            <div class="actions">
                <button class="remove-btn" onclick="removeFromWishlist('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="add-to-cart" onclick="addToCart('${item.id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Function to update wishlist count in navbar
function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Function to show toast notifications
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initialize wishlist display
document.addEventListener('DOMContentLoaded', () => {
    displayWishlistItems();
    updateWishlistCount();
}); 