import { getLocalStorage } from "./utils.mjs";
import{checkout} from "./externalServices.mjs"

function formDataToJSON(formElement) {
    const data = new FormData(formElement),
      convertedJSON = {};
    
    data.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON
}

function packageItems(items) {
    const simpleItems = items.map((item) => {
        return {
            id: item.id,
            price: item.FinalPrice,
            name: item.Name, 
            quantity: 1,
        };
    });
    return simpleItems;
}

const checkoutProcess = {
    key:"",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector){
        this.key= key;
        this.outputSelector= outputSelector;
        this.list= getLocalStorage(key);
        this.calculateItemSummary();
    },
    calculateItemSummary: function(){
        const summaryEl = document.querySelector(this.outputSelector + " #cartTotal");
        const itemsNumberEl = document.querySelector(this.outputSelector + " #num-items");
        itemsNumberEl.innerText = this.list.length;

        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryEl.innerText = "$" + this.itemTotal;
    },

    calculateOrdertotal: function(){
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
          parseFloat(this.itemTotal) +
          parseFloat(this.shipping) +
          parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    },
    displayOrderTotals: function(){
        const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        orderTotal.innerText = "$" + this.orderTotal;
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
    },
    checkout: async function (form) {
        const json = formDataToJSON(form);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
          const res = await checkout(json);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      },
};
export default checkoutProcess;