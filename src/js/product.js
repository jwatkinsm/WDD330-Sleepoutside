import productDetails from "./productDetails.mjs";
import { getParam } from "./utils.mjs";

const productId = getParam("product");
productDetails(productId);
