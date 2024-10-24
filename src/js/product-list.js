import productList from "./productList.mjs";
import { renderAlerts } from "./alert.mjs";
import { renderCartCount, getParam } from "./utils.mjs";
import{loadHeaderFooter} from "./utils.mjs"
 
loadHeaderFooter();
const category= getParam("category");
productList(".product-list", category);
renderAlerts();
renderCartCount();