import { loadHeaderFooter, alertMessage} from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

  document.querySelector('#checkout')
  .addEventListener('click', (e) => {
    e.preventDefault();
    var myForm = document.forms[0];
    var chk_status = myForm.checkValidity();
    myForm.reportValidity();
    const form = document.getElementById("checkout-form");
    const zip = myform.zip.value;
    const cardNumber = form.cardNumber.value;
    const expiration = form.expiration.value;
    const code = form.code.value;

    const zipPattern = /^\d{5}$/;
    const cardPattern = /^\d{16}$/;
    const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const codePattern = /^\d{3}$/;

    let alertList = [];

    if (!zipPattern(zip)) {
      alertList.push("Invalid zip code");
    }
    if (!cardPattern.test(cardNumber)) {
      alertList.push("Invalid card number");
    }
    if (!expirationPattern.test(expiration)) {
      alertList.push("Invalid expiration date");
    }
    if (!codePattern.test(code)) {
      alertList.push("Invalid security code");
    }

    if (alertList.length > 0) {
      alertList.forEach((message) => {
        alertMessage(message);
      });
      return;
    }

    if(chk_status) 
      checkoutProcess.checkout();
    return;
  });
