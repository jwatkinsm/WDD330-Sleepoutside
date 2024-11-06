import { getProductsByCategory } from "./ExternalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

  let discounted = "none";
  let discount = 0;
  if (product.SuggestedRetailPrice > product.FinalPrice) {
    discount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    discounted = "block";
  }

    return `<li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
       <p class="product-card__discount product_discount" style="display: ${discounted};">Save $${discount}</p>
    </li>`;
  }

export default async function productList(selector, category){
    const element= document.querySelector(selector);
    const products= await getProductsByCategory(category);
    const categoryTitle = document.getElementById("category-title");
    categoryTitle.innerText = category.charAt(0).toUpperCase() + category.slice(1);
    renderListWithTemplate(productCardTemplate, element, products);
}
