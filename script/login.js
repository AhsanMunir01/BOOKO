const toggle_password=document.getElementById("toggle-password");
const password=document.getElementById("password-input-field");

password.setAttribute('type', 'password'); 

toggle_password.addEventListener("click", function(){
    const type=password.getAttribute('type')==='password'? 'text':'password'
    password.setAttribute("type",type);

  this.classList.toggle('fa-eye-slash');
  this.classList.toggle('fa-eye');
})

// Forgot Password Modal
const modal = document.getElementById("forgot-password-modal");
const forgotPasswordLink = document.getElementById("forgot-password-link");
const closeBtn = document.getElementsByClassName("close")[0];
const forgotPasswordForm = document.getElementById("forgot-password-form");

// Open modal
forgotPasswordLink.addEventListener("click", function(e) {
    e.preventDefault();
    modal.classList.add("show");
});

// Close modal when clicking the X
closeBtn.addEventListener("click", function() {
    modal.classList.remove("show");
});

// Close modal when clicking outside
window.addEventListener("click", function(e) {
    if (e.target == modal) {
        modal.classList.remove("show");
    }
});

// Handle forgot password form submission
forgotPasswordForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const email = document.getElementById("reset-email").value.trim();
    
    // Basic email validation
    if (!email) {
        showError('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Here you would typically make an API call to your backend
    // For now, we'll simulate a successful request
    showSuccess('Password reset link has been sent to your email');
    
    // Clear the form
    this.reset();
    
    // Close modal after 3 seconds
    setTimeout(() => {
        modal.classList.remove("show");
    }, 3000);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show-message';
    errorDiv.textContent = message;
    
    const form = document.getElementById('forgot-password-form');
    const existingError = form.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    form.insertBefore(errorDiv, form.firstChild);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.getElementById('forgot-password-form');
    const existingMessage = form.querySelector('.success-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    form.insertBefore(successDiv, form.firstChild);
}