document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.form-container');
    
    // Add the 'active' class to make the form container visible with animation
    setTimeout(() => {
        formContainer.classList.add('active');
    }, 100);

    // Captcha generation
    function generateCaptcha() {
        const captchaText = document.getElementById('captchaText');
        const captcha = Math.random().toString(36).substr(2, 6).toUpperCase();
        captchaText.textContent = captcha;
        return captcha;
    }

    let currentCaptcha = generateCaptcha();

    // Handle form validation
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const captcha = document.getElementById('captcha').value.trim();

        let valid = true;

        // Clear previous errors
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('phoneError').textContent = '';
        document.getElementById('passwordError').textContent = '';
        document.getElementById('confirmPasswordError').textContent = '';
        document.getElementById('captchaError').textContent = '';

        // Validate Full Name
        if (fullName.length < 5) {
            document.getElementById('nameError').textContent = 'Name must be at least 5 characters long.';
            valid = false;
        }

        // Validate Email
        if (!email.includes('@')) {
            document.getElementById('emailError').textContent = 'Enter a valid email address.';
            valid = false;
        }

        // Validate Phone Number
        if (!/^\d{10}$/.test(phone) || phone === '1234567890') {
            document.getElementById('phoneError').textContent = 'Enter a valid 10-digit phone number.';
            valid = false;
        }

        // Validate Password
        if (password.length < 8 || password.toLowerCase() === 'password' || password.toLowerCase() === fullName.toLowerCase()) {
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long and not be "password" or your name.';
            valid = false;
        }

        // Validate Confirm Password
        if (password !== confirmPassword) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
            valid = false;
        }

        // Validate Captcha
        if (captcha !== currentCaptcha) {
            document.getElementById('captchaError').textContent = 'Captcha is incorrect.';
            valid = false;
        }

        if (valid) {
            alert('Form submitted successfully!');
            // Here you can add code to submit the form
        }
    });

    // Generate new captcha on page load
    currentCaptcha = generateCaptcha();
});
