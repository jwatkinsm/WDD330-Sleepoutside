import { loadHeaderFooter} from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

  document.forms["checkout"].addEventListener("submit", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    checkoutProcess.checkout(e.target);

  });
