<<<<<<< HEAD
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import productData from "./productData.mjs";
import productDetails from './productDetails.mjs';
import {getParams} from './utils.mjs'

const productId = getParam('prodcut');
productDetails(productId);
=======
import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

const productId = getParam('product');
console.log(findProductById(productId));

function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  
>>>>>>> 110e02dfd9bd29e250fa0cb198ee53172d0e40d6
