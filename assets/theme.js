// Basic theme JavaScript for interactions

document.addEventListener('DOMContentLoaded', function() {
  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.dataset.productId;
      // Shopify AJAX API for adding to cart
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          quantity: 1
        })
      })
      .then(response => response.json())
      .then(data => {
        // Update cart count or show message
        console.log('Added to cart:', data);
        // Optionally update cart icon count
        updateCartCount();
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
    });
  });

  // Newsletter signup
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('.newsletter-input').value;
      // Handle newsletter signup (e.g., via Shopify API or external service)
      console.log('Newsletter signup:', email);
      // Show success message
      alert('Thank you for subscribing!');
      this.reset();
    });
  }

  // Mobile menu toggle (basic, expand as needed)
  // Assuming a hamburger menu is added later
});

function updateCartCount() {
  // Fetch and update cart item count
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      const cartIcon = document.querySelector('.cart-icon');
      if (cart.item_count > 0) {
        cartIcon.title = `Cart: ${cart.item_count} items`;
      }
    });
}

// Smooth scrolling for anchor links if needed
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
