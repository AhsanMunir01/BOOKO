import collection_list from './collection-database.js';

// Function to shuffle array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to initialize trending books slider
function initTrendingBooks() {
    const swiperWrapper = document.querySelector('.trending-swiper .swiper-wrapper');
    
    // Get random books from collection
    const randomBooks = shuffleArray([...collection_list]).slice(0, 8);
    
    // Create slides for each book
    randomBooks.forEach(book => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="trending-book-card">
                <div class="trending-book-image-container">
                    <img src="${book.image}" alt="${book.name}" class="trending-book-image">
                    <button class="wishlist-btn" data-book-id="${book.id}">
                        <i class="fa fa-heart" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="trending-book-info">
                    <h3 class="trending-book-title">${book.name}</h3>
                    <p class="trending-book-description">${book.description}</p>
                    <div class="trending-book-price">$${book.price}</div>
                    <button class="trending-book-button" onclick="window.location.href='collections.html'">
                        View Details
                    </button>
                </div>
            </div>
        `;
        
        swiperWrapper.appendChild(slide);
    });
    
    // Initialize Swiper
    new Swiper('.trending-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            968: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    // Add event listeners for wishlist buttons
    const wishlistButtons = document.querySelectorAll('.trending-book-card .wishlist-btn');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookId = this.dataset.bookId;
            const book = collection_list.find(b => b.id === bookId);
            
            if (book) {
                // Get existing wishlist from localStorage
                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                
                // Check if book is already in wishlist
                const isInWishlist = wishlist.some(item => item.id === bookId);
                
                if (!isInWishlist) {
                    // Add to wishlist
                    wishlist.push(book);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    this.classList.add('active');
                    
                    // Update wishlist count
                    const wishlistCount = document.querySelector('.wishlist-count');
                    if (wishlistCount) {
                        wishlistCount.textContent = wishlist.length;
                    }
                    
                    // Show success message
                    showToast('Book added to wishlist!');
                } else {
                    // Remove from wishlist
                    wishlist = wishlist.filter(item => item.id !== bookId);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    this.classList.remove('active');
                    
                    // Update wishlist count
                    const wishlistCount = document.querySelector('.wishlist-count');
                    if (wishlistCount) {
                        wishlistCount.textContent = wishlist.length;
                    }
                    
                    // Show removal message
                    showToast('Book removed from wishlist!');
                }
            }
        });
        
        // Check if book is in wishlist and update button state
        const bookId = button.dataset.bookId;
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (wishlist.some(item => item.id === bookId)) {
            button.classList.add('active');
        }
    });
}

// Function to show toast message
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }, 100);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTrendingBooks); 