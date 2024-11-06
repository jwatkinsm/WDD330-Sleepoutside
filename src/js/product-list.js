import productList from "./productList.mjs";
import { renderAlerts } from "./alert.mjs";
import { renderCartCount, getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
productList(".product-list", category);
renderAlerts();
renderCartCount();
