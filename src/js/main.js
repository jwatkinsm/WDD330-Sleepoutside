import productList from "./productList.mjs";
import { renderAlerts } from "./alert.mjs";
import { renderCartCount } from "./utils.mjs";

productList(".product-list", "tents");
renderAlerts();
renderCartCount();