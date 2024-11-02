import { renderAlerts } from "./alert.mjs";
import { renderCartCount } from "./utils.mjs";
import{loadHeaderFooter} from "./utils.mjs"
 
loadHeaderFooter();
renderAlerts();
renderCartCount();