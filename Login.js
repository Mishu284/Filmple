document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.querySelector('input[name="remember"]').checked;
            
            // Validate inputs
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (password.length < 1) {
                showNotification('Please enter your password', 'error');
                return;
            }
            
            // Simulate login - In a real application, this would be an API call
            simulateLogin(email, password, rememberMe);
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function simulateLogin(email, password, rememberMe) {
        // This simulates an API request with a timeout
        showNotification('Logging in...', 'info');
        
        setTimeout(() => {
            // Simulate successful login
            // In a real application, you'd validate credentials against your backend
            
            // For demo purposes, let's consider any login successful
            const userData = {
                email: email,
                name: email.split('@')[0], // Just use the username part of the email
                token: 'simulated-jwt-token-' + Math.random().toString(36).substr(2)
            };
            
            if (rememberMe) {
                localStorage.setItem('userAuth', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('userAuth', JSON.stringify(userData));
            }
            
            showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to the main page after successful login
            setTimeout(() => {
                window.location.href = 'FILMPLE.html';
            }, 1000);
            
        }, 1500); // Simulate network delay
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