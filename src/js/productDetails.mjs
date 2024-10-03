<<<<<<< HEAD
import{findProductById} from "./productData.mjs";
import{setLocalStorage} from "./utils.mjs";

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
    
=======
import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
    
}

>>>>>>> 110e02dfd9bd29e250fa0cb198ee53172d0e40d6

