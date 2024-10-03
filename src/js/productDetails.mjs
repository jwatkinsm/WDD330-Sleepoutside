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
    

