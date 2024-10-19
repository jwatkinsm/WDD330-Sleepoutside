import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function ShoppingCart(){
    const cartItems = getLocalStorage("so-cart");
    const outputEl = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);
    getCartTotal(cartItems);
    if(!cartItems){
      return;
    }
}
/*function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (!cartItems) {
    return;
  }
  const htmlItems = cartItemTemplate(cartItems);
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  getCartTotal(cartItems);
  renderCartCount();
}*/
function cartItemTemplate(item) {
    
    const newItem = `<li class="cart-card divider">
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
  </li>`;
  

      return newItem;
  }
/* function getCartTotal(cartItems) {
    const cartTotal = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
    document.querySelector(".cart-footer-hide").classList.add("cart-footer-show");
    document.querySelector(".cart-total").textContent = `Total: $${cartTotal}`;
  }*/
    function getCartTotal(cartItems) {
      const cartTotal = cartItems.reduce((total, item) => total + item.FinalPrice, 0);
      document.querySelector(".cart-footer-hide").classList.add("cart-footer-show");
      document.querySelector(".cart-total").textContent = `Total: $${cartTotal}`;
    }
