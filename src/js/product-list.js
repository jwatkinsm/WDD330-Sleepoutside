import productList from "./productList.mjs";
import { renderAlerts } from "./alert.mjs";
import { renderCartCount } from "./utils.mjs";
import{loadHeaderFooter} from "./utils.mjs"
 
loadHeaderFooter();
productList(".product-list", "tents");
renderAlerts();
renderCartCount();