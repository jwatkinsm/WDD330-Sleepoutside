import{findProductById} from "./productData.mjs";
import{setLocalStorage} from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails(product);
  document.getElementById("addToCart").addEventListener("click", addProductToCart);
}

function addProductToCart(product) {
    const cart = getLocalStorage("so-cart") || [];
    cart.push(product);
    setLocalStorage("so-cart", cart);
  }
  

