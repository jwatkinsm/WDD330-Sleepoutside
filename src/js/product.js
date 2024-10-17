import productDetails from "./productDetails.mjs";
import { getParam, renderCartCount } from "./utils.mjs";
import{loadHeaderFooter} from "./utils.mjs"

loadHeaderFooter();
const productId = getParam("product");
productDetails(productId);
renderCartCount();