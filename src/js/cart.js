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

function attachRemoveListeners() {
  const productList = document.querySelector(".product-list");
  
  productList.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-item")) {
      const itemId = event.target.getAttribute("data-id");
      removeItemFromCart(itemId);
    }
  });
}

function removeItemFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart");

  cartItems = cartItems.filter(item => item.Id !== Number(itemId));

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
}

renderCartContents();
