import { getLocalStorage, setLocalStorage, renderCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  const htmlItems = cartItemTemplate(cartItems);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  getCartTotal(cartItems);
  renderCartCount();

  // Attach event listeners to the "X" icons
  attachRemoveListeners();
}

function cartItemTemplate(cartItems) {
  return cartItems.map((item, index) => {
    return `<li class="cart-card divider" data-id="${item.Id}">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Image}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="remove-item" data-id="${item.Id}">X</button>  <!-- Remove button -->
    </li>`;
  });
}

function getCartTotal(cartItems) {
  const cartTotal = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
  document.querySelector(".cart-footer-hide").classList.add("cart-footer-show");
  document.querySelector(".cart-total").textContent = `Total: $${cartTotal}`;
}

// Function to attach event listeners to the "X" (remove) buttons
function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  
  removeButtons.forEach(button => {
    button.addEventListener("click", function() {
      const itemId = button.getAttribute("data-id");
      removeItemFromCart(itemId);
    });
  });
}

// Function to remove the item from the cart
function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");

  // Filter out the item to be removed
  cartItems = cartItems.filter(item => item.Id !== itemId);

  // Update the cart in LocalStorage
  setLocalStorage("so-cart", cartItems);

  // Re-render the cart contents after removal
  renderCartContents();
}

renderCartContents();
