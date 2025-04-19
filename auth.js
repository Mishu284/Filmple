// Authentication Utilities
const AUTH_KEY = 'userAuth';

const auth = {
    // Get current user information
    getCurrentUser: function() {
        const userAuth = localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY);
        return userAuth ? JSON.parse(userAuth) : null;
    },
    
    // Check if user is logged in
    isLoggedIn: function() {
        return this.getCurrentUser() !== null;
    },
    
    // Log out the current user
    logout: function() {
        localStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(AUTH_KEY);
        
        // Redirect to login page after logout
        window.location.href = 'login.html';
    },
    
    // Update user data (for profile updates)
    updateUserData: function(newData) {
        const userData = this.getCurrentUser();
        
        if (userData) {
            const updatedData = {...userData, ...newData};
            
            // Save to the same storage used before (local or session)
            if (localStorage.getItem(AUTH_KEY)) {
                localStorage.setItem(AUTH_KEY, JSON.stringify(updatedData));
            } else {
                sessionStorage.setItem(AUTH_KEY, JSON.stringify(updatedData));
            }
            
            return true;
        }
        
        return false;
    },
    
    // Utility to protect routes - redirect to login if not authenticated
    requireAuth: function() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add logout handler to logout buttons
    const logoutButtons = document.querySelectorAll('.logout-button');
    
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            auth.logout();
        });
    });
    
    // Update UI based on login status
    updateUIForAuthStatus();
});

// Update UI elements based on login status
function updateUIForAuthStatus() {
    const user = auth.getCurrentUser();
    
    // Update navbar
    const navbar = document.querySelector('.navbar');
    
    if (navbar && user) {
        // Add user profile link to navbar if not already there
        if (!document.querySelector('.user-profile-link')) {
            const userLink = document.createElement('a');
            userLink.href = 'profile.html';
            userLink.className = 'user-profile-link';
            userLink.textContent = user.name || user.email.split('@')[0];
            navbar.appendChild(userLink);
            
            // Add logout button
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.className = 'logout-button';
            logoutLink.textContent = 'Logout';
            logoutLink.addEventListener('click', function(e) {
                e.preventDefault();
                auth.logout();
            });
            navbar.appendChild(logoutLink);
        }
    }
    
    // Find login/register links and hide them when user is logged in
    if (user) {
        const loginLinks = document.querySelectorAll('a[href="login.html"], a[href="register.html"]');
        loginLinks.forEach(link => {
            link.style.display = 'none';
        });
    }
}