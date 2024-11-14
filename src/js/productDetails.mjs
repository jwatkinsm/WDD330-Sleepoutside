import{findProductById} from "./externalServices.mjs";
import{setLocalStorage, getLocalStorage, startCartAnimation, stopCartAnimation, renderCartCount, updateBreadcrumb, alertMessage} from "./utils.mjs";

let product = {};
let selectedColorIndex = 0;

export default async function productDetails(productId) {
  product = await findProductById(productId);
  renderProductDetails(product);
  updateBreadcrumb(product);
  document.getElementById("addToCart").addEventListener("click", addProductToCart);
}

function addProductToCart() {
    const cart = getLocalStorage("so-cart") || [];
    const existingItem = cart.find((item) => item.Id === product.Id);

    if (existingItem && existingItem.Colors.ColorName === product.Colors[selectedColorIndex].ColorName) {
      existingItem.FinalPrice += product.FinalPrice;
      existingItem.Quantity += 1;
    } else {
      product.Quantity = 1;
      product.Colors = product.Colors[selectedColorIndex];
      cart.push(product);
    }
    
    setLocalStorage("so-cart", cart);
    alertMessage("Product added to cart", true);
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

  const colorSwatchesContainer = document.querySelector("#colorSwatches");

  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;


  product.Colors.forEach((color, index) => {
    const swatch = document.createElement("img");
    swatch.classList.add("color-swatch");
    swatch.src = color.ColorChipImageSrc; 
    swatch.alt = color.ColorName;
    
    colorSwatchesContainer.appendChild(swatch);

    swatch.addEventListener("click", () => {
      selectedColorIndex = index;
      document.querySelector("#productColorName").innerText = color.ColorName;
      document.querySelector("#productImage").src = color.ColorPreviewImageSrc; // Assuming each color has an ImageUrl property
      document.querySelector("#productImage").alt = product.Name + " - " + color.ColorName;
    });
  });

  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  discountMessage;
 
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
