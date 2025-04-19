document.addEventListener('DOMContentLoaded', function() {
    // Redirect to login if not authenticated
    if (!auth.requireAuth()) return;
    
    const user = auth.getCurrentUser();
    const profileForm = document.getElementById('profile-form');
    const passwordForm = document.getElementById('password-form');
    const logoutButton = document.getElementById('logout-button');
    const newPasswordInput = document.getElementById('new-password');
    const strengthBar = document.querySelector('.strength-bar');
    
    // Populate user profile data
    if (user && profileForm) {
        document.getElementById('profile-name').value = user.fullname || user.name || '';
        document.getElementById('profile-email').value = user.email || '';
    }
    
    // Handle profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('profile-name').value;
            
            // Validate inputs
            if (fullname.length < 3) {
                showNotification('Please enter your full name (minimum 3 characters)', 'error');
                return;
            }
            
            // Update profile
            const success = auth.updateUserData({fullname: fullname, name: fullname});
            
            if (success) {
                showNotification('Profile updated successfully', 'success');
            } else {
                showNotification('Failed to update profile', 'error');
            }
        });
    }
    
    // Password strength meter
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
    }
    
    // Handle password form submission
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            
            // Validate inputs
            if (currentPassword.length < 1) {
                showNotification('Please enter your current password', 'error');
                return;
            }
            
            if (!validatePassword(newPassword)) {
                showNotification('New password must be at least 8 characters with letters, numbers, and special characters', 'error');
                return;
            }
            
            if (newPassword !== confirmNewPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }
            
            // Simulate password change - In a real app, you'd verify the current password
            simulatePasswordChange(currentPassword, newPassword);
        });
    }
    
    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            auth.logout();
        });
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
    
    function simulatePasswordChange(currentPassword, newPassword) {}
        // This simulates