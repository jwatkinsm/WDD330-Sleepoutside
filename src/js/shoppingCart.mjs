import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

export default function ShoppingCart() {
    const cartItems = getLocalStorage("so-cart");
    if (!cartItems) {
        return;
    }
    const outputEl = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    getCartTotal(cartItems);

    if (!cartItems || cartItems.length === 0) {
      document.querySelector(".product-list").innerHTML = "<p>Your cart is empty!</p>";
      return;
    }

    outputEl.addEventListener("click", function(event) {
        if (event.target.classList.contains("quantity-btn-increase")) {
          addQuantity(event.target.dataset.id, outputEl, cartItems);
        }
    });

    outputEl.addEventListener("click", function(event) {
      if (event.target.classList.contains("quantity-btn-decrease")) {
        subtractQuantity(event.target.dataset.id, outputEl, cartItems);
      }
    });

    outputEl.addEventListener("click", function(event) {
      if (event.target.classList.contains("remove-cart-item")) {
        deleteItem(event.target.dataset.id, outputEl, cartItems);
      }
    }); 
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="cart-card__quantity">
      <button class="quantity-btn-increase" data-id="${item.Id}">+</button>
      <span>qty: ${item.Quantity}</span>
      <button class="quantity-btn-decrease" data-id="${item.Id}">-</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-cart-item" data-id="${item.Id}">X</button>
  </li>`;
    return newItem;
}

function getCartTotal(cartItems) {
    const cartTotal = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
    if(cartTotal > 0){
    document.querySelector(".cart-footer-hide").classList.add("cart-footer-show");
    document.querySelector(".cart-total").textContent = `Total: $${cartTotal.toFixed(2)}`;
    }
}

function addQuantity(productId, outputEl, cartItems) {
    const item = cartItems.find((item) => item.Id == productId);
    item.Quantity++;
    item.FinalPrice += item.ListPrice;

    setLocalStorage("so-cart", cartItems);
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    getCartTotal(cartItems);
}

function subtractQuantity(productId, outputEl, cartItems) {
  const item = cartItems.find((item) => item.Id == productId);
  if (item.Quantity == 1) {
    const index = cartItems.indexOf(item);
    cartItems.splice(index,1);
  } else {
    item.Quantity --;
    item.FinalPrice = item.FinalPrice - item.ListPrice;
  }

  setLocalStorage("so-cart", cartItems);
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  getCartTotal(cartItems);
}

function deleteItem(productId, outputEl, cartItems) {
  const item = cartItems.find((item) => item.Id == productId);
  const index = cartItems.indexOf(item);
  cartItems.splice(index,1);

  setLocalStorage("so-cart", cartItems);
  renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
  getCartTotal(cartItems);
}