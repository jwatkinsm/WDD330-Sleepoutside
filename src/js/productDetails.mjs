import{findProductById} from "./externalServices.mjs";
import{setLocalStorage, getLocalStorage, startCartAnimation, stopCartAnimation, renderCartCount} from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails(product);
  document.getElementById("addToCart").addEventListener("click", addProductToCart);
}

function addProductToCart() {
    const cart = getLocalStorage("so-cart") || [];
    const existingItem = cart.find((item) => item.Id === product.Id);

    if (existingItem) {
      existingItem.FinalPrice += product.FinalPrice;
      existingItem.Quantity += 1;
    } else {
      product.Quantity = 1;
      cart.push(product);
    }
    
    setLocalStorage("so-cart", cart);
    renderCartCount();
    startCartAnimation();
    setTimeout(() => {stopCartAnimation()}, 500);
  }
  
function renderProductDetails(){

  let discountMessage = "";
  let originalPrice = "";
  if (product.SuggestedRetailPrice > product.FinalPrice) {
    const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    discountMessage = document.querySelector("#productDiscountPrice").innerText = 'SAVE '+ discountAmount;
    originalPrice = document.querySelector("#productOrginalPrice").innerText = product.SuggestedRetailPrice;
  }

  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  discountMessage;
 
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
