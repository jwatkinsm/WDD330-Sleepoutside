import productDetails from "./productDetails.mjs";
import { getParam, renderCartCount } from "./utils.mjs";

const productId = getParam("product");
productDetails(productId);
renderCartCount();