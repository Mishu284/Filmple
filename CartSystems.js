class ShoppingCart {
    constructor() {
        // Initialize cart from localStorage or create new empty cart
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.total = 0;
        this.init();
    }

    init() {
        // Create cart UI and set up initial state
        this.createCartIcon();
        this.updateCartDisplay();
        
        // Add event listener for cart icon
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            cartIcon.addEventListener('click', () => this.toggleCart());
        }
    }

    addItem(item) {
        // Check if item already exists in cart
        const existingItem = this.cart.find(i => i.id === item.id);
        
        if (!existingItem) {
            this.cart.push(item);
            this.saveCart();
            this.updateCartDisplay();
            this.showNotification('Item added to cart');
        } else {
            this.showNotification('Item already in cart');
        }
    }

    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Item removed from cart');
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Cart cleared');
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateTotal();
    }

    updateTotal() {
        this.total = this.cart.reduce((sum, item) => sum + item.price, 0);
    }

    createCartIcon() {
        if (!document.getElementById('cart-container')) {
            const cartContainer = document.createElement('div');
            cartContainer.id = 'cart-container';
            
            // Create cart HTML structure
            cartContainer.innerHTML = `
                <div id="cart-icon" class="cart-icon">
                    🛒 <span id="cart-count">0</span>
                </div>
                <div id="cart-sidebar" class="cart-sidebar">
                    <div class="cart-header">
                        <h2>Shopping Cart</h2>
                        <button id="close-cart">×</button>
                    </div>
                    <div id="cart-items" class="cart-items"></div>
                    <div class="cart-footer">
                        <div class="cart-total">Total: $<span id="cart-total">0.00</span></div>
                        <button id="checkout-button" class="custom-button">Checkout</button>
                        <button id="clear-cart" class="clear-cart-button">Clear Cart</button>
                    </div>
                </div>
                <div id="notification" class="notification"></div>
            `;
            
            document.body.appendChild(cartContainer);
            
            // Add event listeners for cart actions
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Close cart button
        const closeCart = document.getElementById('close-cart');
        if (closeCart) {
            closeCart.addEventListener('click', () => this.toggleCart());
        }

        // Checkout button
        const checkoutButton = document.getElementById('checkout-button');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (this.cart.length > 0) {
                    alert('Proceeding to checkout...');
                } else {
                    this.showNotification('Cart is empty');
                }
            });
        }

        // Clear cart button
        const clearCartButton = document.getElementById('clear-cart');
        if (clearCartButton) {
            clearCartButton.addEventListener('click', () => {
                if (this.cart.length > 0) {
                    this.clearCart();
                } else {
                    this.showNotification('Cart is already empty');
                }
            });
        }
    }

    toggleCart() {
        const sidebar = document.getElementById('cart-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('show');
        }
    }

    updateCartDisplay() {
        // Update cart count
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.length;
        }

        // Update cart items
        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="item-details">
                        <h3>${item.title}</h3>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-item" onclick="cart.removeItem('${item.id}')">×</button>
                </div>
            `).join('');
        }

        // Update total
        this.updateTotal();
        const cartTotal = document.getElementById('cart-total');
        if (cartTotal) {
            cartTotal.textContent = this.total.toFixed(2);
        }
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.classList.add('show');
            
            // Remove notification after 2 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }
    }
}

// Initialize cart
const cart = new ShoppingCart();