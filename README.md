# BOOKO - Online Bookstore

A modern, responsive online bookstore that offers a seamless book shopping experience with personalized recommendations and user authentication. BOOKO aims to bring the joy of reading to users through an intuitive and engaging platform.

## Features

### User Experience
- 📚 Clean and intuitive book browsing interface
- 📱 Fully responsive design that works on all devices
- 🎨 Interactive cursor animations for enhanced user engagement
- 💫 Smooth page transitions and loading animations

### Authentication System
- 🔐 Secure user registration and login
- 👤 Personalized user profiles
- 📖 Reading interest selection and management
- ✨ Customized book recommendations based on user interests

### Interactive Elements
- 🔍 Dynamic search functionality
- 📱 Mobile-friendly navigation
- ✅ Form validation with user-friendly feedback
- 🎯 Interest-based content personalization

## Tech Stack

### Frontend Technologies
- HTML5
- CSS3 (with modern animations and responsive design)
- JavaScript (ES6+)

### Project Structure
```
├── index.html          # Main landing page
├── login.html          # User login page
├── signup.html         # New user registration
├── styles/
│   ├── styles.css      # Global styles
│   ├── home.css        # Homepage specific styles
│   └── login-signup.css# Authentication pages styles
└── script/
    ├── cursor.js           # Custom cursor effects
    ├── interest_database.js# User interests storage
    ├── interest_section.js # Interest selection logic
    ├── login.js           # Login functionality
    └── signup.js          # Registration handling
```

## Installation & Usage

1. Clone the repository
```bash
git https://github.com/AhsanMunir01/BOOKO
```

2. Navigate to project directory
```bash
cd booko
```

3. Run the project
- Simply open `index.html` in your web browser
- Or use a local server:
  ```bash
  # Using Python
  python -m http.server 8000
  
  # Using Node.js
  npx http-server
  ```

## Development

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Basic knowledge of HTML, CSS, and JavaScript

### Key Features Implementation

#### User Authentication
```javascript
// Example from login.js
function validateForm() {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
}
```

#### Interest Selection
```javascript
// Example from interest_section.js
function handleInterestSelection(interest) {
   
    updateUserInterests(interest);
   
    updateRecommendations();
}
```

## Live Demo

Experience BOOKO: [BOOKO](https://github.com/AhsanMunir01/BOOKO.git)

## Author & Contact

**Your Name**
- 📧 Email: ahsanmmunir@gmail.com
- 🔗 GitHub: [@yourusername](https://github.com/AhsanMunir01)
-

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- 📚 Book data: [Google Books API](https://developers.google.com/books)
- 🎨 Icons: [Font Awesome](https://fontawesome.com)
- 🔤 Fonts: [Google Fonts](https://fonts.google.com) 