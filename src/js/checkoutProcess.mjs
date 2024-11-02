import { getLocalStorage } from "./utils.mjs";

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

    },
    displayOrderTotals: function(){
        const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        orderTotal.innerText = "$" + this.orderTotal;
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
    }
}
export default checkoutProcess;