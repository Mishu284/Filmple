document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const strengthBar = document.querySelector('.strength-bar');
    
    if (registerForm) {
        // Password strength meter
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }
        
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const termsAccepted = document.querySelector('input[name="terms"]').checked;
            
            // Validate inputs
            if (fullname.length < 3) {
                showNotification('Please enter your full name (minimum 3 characters)', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!validatePassword(password)) {
                showNotification('Password must be at least 8 characters with letters, numbers, and special characters', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (!termsAccepted) {
                showNotification('You must accept the Terms and Conditions', 'error');
                return;
            }
            
            // Simulate registration
            simulateRegistration(fullname, email, password);
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePassword(password) {
        // Password must be at least 8 characters with letters, numbers, and special characters
        const minLength = password.length >= 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return minLength && hasLetter && hasNumber && hasSpecial;
    }
    
    function updatePasswordStrength(password) {
        let strength = 0;
        
        // Add strength for length
        if (password.length >= 8) strength += 25;
        
        // Add strength for having letters
        if (/[a-zA-Z]/.test(password)) strength += 25;
        
        // Add strength for having numbers
        if (/\d/.test(password)) strength += 25;
        
        // Add strength for having special characters
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
        
        // Update the strength bar
        strengthBar.style.width = strength + '%';
        
        // Change color based on strength
        if (strength < 50) {
            strengthBar.style.backgroundColor = '#ff4444'; // Weak - Red
        } else if (strength < 75) {
            strengthBar.style.backgroundColor = '#ffbb33'; // Medium - Yellow
        } else {
            strengthBar.style.backgroundColor = '#00C851'; // Strong - Green
        }
    }
    
    function simulateRegistration(fullname, email, password) {
        // This simulates an API request with a timeout
        showNotification('Creating your account...', 'info');
        
        setTimeout(() => {
            // Simulate successful registration
            // In a real application, you'd send this data to your backend
            
            const userData = {
                fullname: fullname,
                email: email,
                token: 'simulated-jwt-token-' + Math.random().toString(36).substr(2)
            };
            
            // Store in localStorage for persistence
            localStorage.setItem('userAuth', JSON.stringify(userData));
            
            showNotification('Account created successfully! Redirecting...', 'success');
            
            // Redirect to the main page after successful registration
            setTimeout(() => {
                window.location.href = 'FILMPLE.html';
            }, 1500);
            
        }, 2000); // Simulate network delay
    }
    
    function showNotification(message, type = 'info') {
        // Check if notification element exists, create if not
        let notification = document.getElementById('auth-notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'auth-notification';
            notification.className = 'notification';
            document.body.appendChild(notification);
            
            // Add styles for the notification
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.padding = '12px 25px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
            notification.style.zIndex = '1003';
            notification.style.transition = 'opacity 0.3s ease-in-out';
        }
        
        // Set notification color based on type
        if (type === 'error') {
            notification.style.backgroundColor = '#ff4444';
        } else if (type === 'success') {
            notification.style.backgroundColor = '#00C851';
        } else if (type === 'info') {
            notification.style.backgroundColor = '#567c8d';
        }
        
        notification.style.color = '#ffffff';
        notification.textContent = message;
        notification.style.opacity = '1';
        
        // Remove notification after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Check if user is already logged in
    function checkAuthStatus() {
        const userAuth = localStorage.getItem('userAuth') || sessionStorage.getItem('userAuth');
        
        if (userAuth) {
            // User is already logged in, redirect to main page
            window.location.href = 'FILMPLE.html';
        }
    }
    
    // Check auth status when page loads
    checkAuthStatus();
});