import productDetails from "./productDetails.mjs";
import { getParam, renderCartCount, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const productId = getParam("product");
productDetails(productId);
renderCartCount();
